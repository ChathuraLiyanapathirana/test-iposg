import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '../../styles/theme';
import {RecordingStatusProps} from '../../types/app';

export const RecordingStatus: React.FC<RecordingStatusProps> = ({
  isListening,
  displayText,
  error,
}) => {
  return (
    <View style={styles.container}>
      {displayText ? (
        <Text style={styles.recognizedText}>{displayText}</Text>
      ) : (
        <Text style={styles.instructionText}>
          {isListening
            ? 'Listening...'
            : 'Tap the button below to start recording'}
        </Text>
      )}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    paddingHorizontal: theme.spacing.l,
  },
  recognizedText: {
    fontSize: theme.typography.fontSize.xxxlarge - 4,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
    color: theme.colors.text,
  },
  instructionText: {
    fontSize: theme.typography.fontSize.large,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  errorText: {
    marginTop: theme.spacing.l,
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.error,
    textAlign: 'center',
  },
});

export default RecordingStatus;
