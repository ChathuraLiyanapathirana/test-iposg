import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {theme} from '../../styles/theme';
import {VoiceRecordingButtonProps} from '../../types/app';

export const VoiceRecordingButton: React.FC<VoiceRecordingButtonProps> = ({
  isListening,
  loading,
  onPress,
}) => {
  if (loading) {
    return (
      <View style={[styles.recordButton, styles.loadingButton]}>
        <ActivityIndicator size="large" color={theme.colors.card} />
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.recordButton, isListening ? styles.recordingButton : {}]}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={isListening ? styles.stopIcon : styles.recordIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.info,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.large,
  },
  recordingButton: {
    backgroundColor: theme.colors.error,
    transform: [{scale: 1.1}],
  },
  loadingButton: {
    backgroundColor: theme.colors.disabled,
  },
  recordIcon: {
    width: 30,
    height: 30,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.card,
  },
  stopIcon: {
    width: 30,
    height: 30,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.small - 1,
  },
});

export default VoiceRecordingButton;
