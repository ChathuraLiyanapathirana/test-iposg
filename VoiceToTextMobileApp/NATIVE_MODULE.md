# Native Modules in Voice To Text Mobile App

## Overview

Native modules allow React Native applications to access platform-specific APIs that are not available in the JavaScript runtime. This project uses custom native modules to access speech recognition capabilities on iOS and Android.

## Functionality

The Voice To Text Mobile App implements native modules for:

1. **Speech Recognition** - Uses platform-specific APIs to convert voice to text:
   - iOS: Utilizes `Speech Recognition Framework` via a custom Objective-C/Swift bridge
   - Android: Implements the `SpeechRecognizer` API through a Java/Kotlin bridge

2. **Audio Recording** - Provides access to the device's microphone:
   - Handles audio permission requests
   - Manages recording sessions
   - Provides real-time audio level feedback

## Implementation Details

### iOS Native Module

The iOS implementation uses:
- `AVSpeechRecognizer` for speech recognition
- `AVFoundation and Speech` for audio recording
- Swift for the native code
- React Native bridge to expose methods to JavaScript

### Android Native Module

The Android implementation uses:
- `android.speech.SpeechRecognizer` API
- Android's audio permission system
- Java for the native code
- React Native bridge to expose methods to JavaScript

## Usage

To use the native speech recognition module in your React Native code (as implemented in the `useSpeechRecognition` hook):

```javascript
import { NativeModules, NativeEventEmitter } from 'react-native';
const { SpeechToTextModule } = NativeModules;

// Start voice recognition
SpeechToTextModule.startListening();

// Stop voice recognition
SpeechToTextModule.stopListening();

// Set up event listeners for speech recognition results
const speechToTextEmitter = new NativeEventEmitter(SpeechToTextModule);
speechToTextEmitter.addListener('onSpeechResults', (text) => {
  console.log('Recognized text:', text);
});

// Clean up resources when done
SpeechToTextModule.destroy();
```

## Permissions

The app requires microphone permissions to function correctly:

- iOS: Add the `NSMicrophoneUsageDescription` and `NSSpeechRecognitionUsageDescription` keys to your Info.plist
- Android: Add the `RECORD_AUDIO` permission to your AndroidManifest.xml

## Error Handling

The native modules include robust error handling for scenarios such as:
- Microphone permission denied
- No speech detected
- Recognition errors
- Network connectivity issues (for online recognition services)

## Further Information

For detailed implementation information, refer to the native module source code:
- iOS: `/ios/VoiceToTextMobileApp/speech/SpeechToTextModule.swift`
- Android: `/android/app/src/main/java/com/voicetotextmobileapp/speech/SpeechToTextModule.kt`
