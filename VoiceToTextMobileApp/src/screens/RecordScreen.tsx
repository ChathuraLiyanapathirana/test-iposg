import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import {useApiStore} from '../store';
import {theme} from '../styles/theme';
import {RecordScreenNavigationProp} from '../types/app';
import {RecordingStatus} from '../components/RecordingStatus';
import {VoiceRecordingButton} from '../components/Button';

const RecordScreen = () => {
  const navigation = useNavigation<RecordScreenNavigationProp>();
  const {
    isListening,
    partialText,
    finalText,
    error,
    startListening,
    stopListening,
  } = useSpeechRecognition();

  const {sendText, loading, response, error: apiError} = useApiStore();

  // Extract error message from API response if it exists and success is false
  const apiResponseError =
    response && !response.success ? response.data.message : undefined;

  // Flag to track if we should process the final text
  const shouldProcessFinalText = useRef(true);

  const handleToggleRecording = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Track if we've navigated to Results for the current response
  const hasNavigatedForCurrentResponse = useRef(false);

  // Reset navigation tracking when response changes
  useEffect(() => {
    if (!response) {
      hasNavigatedForCurrentResponse.current = false;
    }
  }, [response]);

  useEffect(() => {
    if (
      !isListening &&
      finalText &&
      !loading &&
      shouldProcessFinalText.current
    ) {
      shouldProcessFinalText.current = false; // Prevent multiple sends
      sendText(finalText);
    }

    if (
      response &&
      response.success &&
      !hasNavigatedForCurrentResponse.current
    ) {
      hasNavigatedForCurrentResponse.current = true;
      shouldProcessFinalText.current = false;
      navigation.navigate('Results');
    }
  }, [isListening, finalText, response, loading, sendText, navigation]);

  const displayText = isListening ? partialText : finalText;

  return (
    <View style={styles.container}>
      <RecordingStatus
        isListening={isListening}
        displayText={displayText}
        error={error || apiResponseError || (apiError ?? undefined)}
      />

      <View style={styles.buttonContainer}>
        <VoiceRecordingButton
          isListening={isListening}
          loading={loading}
          onPress={handleToggleRecording}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl + theme.spacing.s,
  },
});

export default RecordScreen;
