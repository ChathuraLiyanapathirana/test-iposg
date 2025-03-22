import {useState, useEffect} from 'react';
import {NativeModules, NativeEventEmitter} from 'react-native';
import {useMicrophonePermission} from './useMicrophonePermission';
import {UseSpeechRecognitionReturn} from '../types/app';

const {SpeechToTextModule} = NativeModules;

export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [partialText, setPartialText] = useState('');
  const [finalText, setFinalText] = useState('');
  const [error, setError] = useState('');
  const [speechToTextEmitter, setSpeechToTextEmitter] =
    useState<NativeEventEmitter | null>(null);

  // Initialize NativeEventEmitter globally
  useEffect(() => {
    if (!SpeechToTextModule) {
      setError(
        'SpeechToTextModule native module not found. Ensure the module is linked correctly.',
      );
      return;
    }
    // Use global NativeEventEmitter since events are emitted via RCTDeviceEventEmitter
    const emitter = new NativeEventEmitter();
    setSpeechToTextEmitter(emitter);
  }, []);

  const {requestMicrophonePermission, permissionError} =
    useMicrophonePermission();

  const startListening = async () => {
    if (!SpeechToTextModule) {
      setError('SpeechToTextModule native module not available');
      return;
    }

    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      setError(permissionError || 'Audio permission not granted');
      return;
    }

    try {
      setIsListening(true);
      setError('');
      setPartialText('');
      setFinalText('');
      await SpeechToTextModule.startListening();
    } catch (errorObj: unknown) {
      const errorMessage =
        errorObj instanceof Error ? errorObj.message : 'Unknown error';
      setError('Error starting speech recognition: ' + errorMessage);
      setIsListening(false);
    }
  };

  const stopListening = async () => {
    if (!SpeechToTextModule) {
      setError('SpeechToTextModule native module not available');
      return;
    }

    try {
      await SpeechToTextModule.stopListening();
      setIsListening(false);
    } catch (errorObj: unknown) {
      const errorMessage =
        errorObj instanceof Error ? errorObj.message : 'Unknown error';
      setError('Error stopping speech recognition: ' + errorMessage);
      setIsListening(false);
    }
  };

  useEffect(() => {
    if (!speechToTextEmitter) return;

    const listeners = [
      speechToTextEmitter.addListener('onSpeechStart', () => {
        setIsListening(true);
      }),
      speechToTextEmitter.addListener(
        'onSpeechPartialResults',
        (text: string) => {
          setPartialText(text);
        },
      ),
      speechToTextEmitter.addListener('onSpeechResults', (text: string) => {
        setFinalText(text);
      }),
      speechToTextEmitter.addListener('onSpeechEnd', () => {
        setIsListening(false);
      }),
      speechToTextEmitter.addListener('onSpeechError', (errorMsg: string) => {
        setError('Speech recognition error: ' + errorMsg);
        setIsListening(false);
      }),
    ];

    return () => {
      listeners.forEach(listener => listener.remove());
    };
  }, [speechToTextEmitter]);

  return {
    isListening,
    partialText,
    finalText,
    error,
    startListening,
    stopListening,
  };
};

export default useSpeechRecognition;
