import Foundation

@objc(SpeechToTextPackage)
class SpeechToTextPackage: NSObject, RCTBridgeModule {
    static func moduleName() -> String! {
        return "SpeechToTextPackage"
    }
    
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    @objc
    func createNativeModules(_ reactContext: RCTBridge!) -> [RCTBridgeModule]! {
        return [SpeechToTextModule()]
    }
}