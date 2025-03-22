import Speech
import AVFoundation

@objc(SpeechToTextModule)
class SpeechToTextModule: RCTEventEmitter {
    
    private var speechRecognizer: SFSpeechRecognizer?
    private var recognitionRequest: SFSpeechAudioBufferRecognitionRequest?
    private var recognitionTask: SFSpeechRecognitionTask?
    private var audioEngine: AVAudioEngine?
    private var isListening = false
    
    override init() {
        super.init()
        speechRecognizer = SFSpeechRecognizer(locale: Locale.current)
        audioEngine = AVAudioEngine()
    }
    
    override func supportedEvents() -> [String]! {
        return ["onSpeechStart", "onSpeechEnd", "onSpeechError", "onSpeechResults", "onSpeechPartialResults"]
    }
    
    @objc
    func startListening(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        SFSpeechRecognizer.requestAuthorization { authStatus in
            DispatchQueue.main.async {
                switch authStatus {
                case .authorized:
                    AVAudioSession.sharedInstance().requestRecordPermission { granted in
                        DispatchQueue.main.async {
                            if !granted {
                                reject("PERMISSION_DENIED", "Microphone permission not granted", nil)
                                return
                            }
                            
                            if self.isListening {
                                reject("ALREADY_LISTENING", "Speech recognition already in progress", nil)
                                return
                            }
                            
                            self.startRecognition()
                            self.isListening = true
                            resolve("Started listening")
                        }
                    }
                default:
                    reject("PERMISSION_DENIED", "Speech recognition permission not granted", nil)
                }
            }
        }
    }
    
    @objc
    func stopListening(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async {
            if !self.isListening {
                reject("NOT_LISTENING", "Speech recognition not in progress", nil)
                return
            }
            
            self.stopRecognition()
            self.isListening = false
            resolve("Stopped listening")
        }
    }
    
    @objc
    func destroy(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async {
            self.stopRecognition()
            self.isListening = false
            self.recognitionTask?.cancel()
            self.recognitionTask = nil
            self.audioEngine = nil
            self.speechRecognizer = nil
            resolve("Speech recognizer destroyed")
        }
    }
    
    private func startRecognition() {
        stopRecognition()
        
        guard let speechRecognizer = speechRecognizer else {
            sendEvent(withName: "onSpeechError", body: "Speech recognizer not available")
            return
        }
        
        let audioSession = AVAudioSession.sharedInstance()
        do {
            try audioSession.setCategory(.record, mode: .measurement, options: .duckOthers)
            try audioSession.setActive(true, options: .notifyOthersOnDeactivation)
        } catch {
            sendEvent(withName: "onSpeechError", body: "Audio session setup failed")
            return
        }
        
        recognitionRequest = SFSpeechAudioBufferRecognitionRequest()
        guard let recognitionRequest = recognitionRequest else { return }
        
        recognitionRequest.shouldReportPartialResults = true
        
        let inputNode = audioEngine!.inputNode
        let recordingFormat = inputNode.outputFormat(forBus: 0)
        inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { (buffer, _) in
            recognitionRequest.append(buffer)
        }
        
        audioEngine!.prepare()
        do {
            try audioEngine!.start()
            sendEvent(withName: "onSpeechStart", body: nil)
        } catch {
            sendEvent(withName: "onSpeechError", body: "Audio engine failed to start")
            return
        }
        
        recognitionTask = speechRecognizer.recognitionTask(with: recognitionRequest) { result, error in
            if let result = result {
                let transcription = result.bestTranscription.formattedString
                if result.isFinal {
                    self.sendEvent(withName: "onSpeechResults", body: transcription)
                    self.stopRecognition()
                    self.isListening = false
                    self.sendEvent(withName: "onSpeechEnd", body: nil)
                } else {
                    self.sendEvent(withName: "onSpeechPartialResults", body: transcription)
                }
            }
            
            if let error = error {
                self.stopRecognition()
                self.isListening = false
                self.sendEvent(withName: "onSpeechError", body: error.localizedDescription)
            }
        }
    }
    
    private func stopRecognition() {
        audioEngine?.stop()
        audioEngine?.inputNode.removeTap(onBus: 0)
        recognitionRequest?.endAudio()
        recognitionTask?.cancel()
        recognitionRequest = nil
        recognitionTask = nil
        
        let audioSession = AVAudioSession.sharedInstance()
        try? audioSession.setActive(false)
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}