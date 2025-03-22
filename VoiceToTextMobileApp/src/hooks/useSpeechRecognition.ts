import {useState, useEffect} from 'react';
import {NativeModules, NativeEventEmitter} from 'react-native';
import {useMicrophonePermission} from './useMicrophonePermission';
import {UseSpeechRecognitionReturn} from '../types/app';

const {SpeechToTextModule} = NativeModules;

/**
 * Custom hook for speech recognition functionality
 * Handles permission requests, speech recognition state, and event listeners
 */
export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [partialText, setPartialText] = useState('');
  const [finalText, setFinalText] = useState('');
  const [error, setError] = useState('');
  const [speechToTextEmitter, setSpeechToTextEmitter] =
    useState<NativeEventEmitter | null>(null);

  // Initialize the NativeEventEmitter safely
  useEffect(() => {
    if (SpeechToTextModule) {
      const emitter = new NativeEventEmitter(SpeechToTextModule);
      setSpeechToTextEmitter(emitter);
    } else {
      setError(
        'SpeechToTextModule native module not found. Ensure the module is linked correctly.',
      );
    }
  }, []);

  // Use the microphone permission hook
  const {requestMicrophonePermission, permissionError} =
    useMicrophonePermission();

  // Start speech recognition
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

  // Stop speech recognition
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

  // Set up event listeners for speech recognition
  useEffect(() => {
    if (!speechToTextEmitter) {
      return;
    }

    const onSpeechStart = speechToTextEmitter.addListener(
      'onSpeechStart',
      () => {
        // Speech started event handler
      },
    );

    const onSpeechPartialResults = speechToTextEmitter.addListener(
      'onSpeechPartialResults',
      (text: string) => {
        setPartialText(text);
      },
    );

    const onSpeechResults = speechToTextEmitter.addListener(
      'onSpeechResults',
      (text: string) => {
        setFinalText(text);
      },
    );

    const onSpeechEnd = speechToTextEmitter.addListener('onSpeechEnd', () => {
      setIsListening(false);
    });

    const onSpeechError = speechToTextEmitter.addListener(
      'onSpeechError',
      (errorMsg: string) => {
        setError('Speech recognition error: ' + errorMsg);
        setIsListening(false);
      },
    );

    // Cleanup listeners on component unmount
    return () => {
      onSpeechStart.remove();
      onSpeechPartialResults.remove();
      onSpeechResults.remove();
      onSpeechEnd.remove();
      onSpeechError.remove();
      SpeechToTextModule?.destroy();
    };
  }, [speechToTextEmitter, error]);

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
