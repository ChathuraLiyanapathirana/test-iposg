import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {theme} from '../../styles/theme';
import {RecordButtonProps} from '../../types/app';

export const RecordButton: React.FC<RecordButtonProps> = ({
  isListening,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.recordButton, isListening ? styles.recordingButton : null]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.buttonIcon}>
        {isListening ? (
          <View style={styles.stopIcon} />
        ) : (
          <View style={styles.micIcon}>
            <View style={styles.micTop} />
          </View>
        )}
      </View>
      <Text style={styles.buttonText}>
        {isListening ? 'Stop Recording' : 'Start Recording'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.m,
    borderRadius: theme.borderRadius.large,
    elevation: 3,
    shadowColor: theme.shadows.medium.shadowColor,
    shadowOffset: theme.shadows.medium.shadowOffset,
    shadowOpacity: theme.shadows.medium.shadowOpacity,
    shadowRadius: theme.shadows.medium.shadowRadius,
  },
  recordingButton: {
    backgroundColor: theme.colors.error,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.s,
  },
  micIcon: {
    width: 14,
    height: 18,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: theme.colors.card,
    position: 'relative',
  },
  micTop: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.card,
    position: 'absolute',
    top: -4,
    left: 3,
  },
  stopIcon: {
    width: 14,
    height: 14,
    backgroundColor: theme.colors.card,
    borderRadius: 2,
  },
  buttonText: {
    color: theme.colors.card,
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.bold,
  },
});

export default RecordButton;
