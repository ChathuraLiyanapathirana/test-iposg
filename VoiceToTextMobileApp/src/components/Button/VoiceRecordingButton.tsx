import React, {useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {GradientBackground} from '../Gradient/GradientBackground';
import {theme} from '../../styles/theme';
import {VoiceRecordingButtonProps} from '../../types/app';

export const VoiceRecordingButton: React.FC<VoiceRecordingButtonProps> = ({
  isListening,
  loading,
  onPress,
}) => {
  // Animation for button pulse effect
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isListening) {
      // Pulsing animation when recording
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();

      // Slow rotation for recording state
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      // Reset animations when not listening
      Animated.parallel([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }

    return () => {
      pulseAnim.stopAnimation();
      rotateAnim.stopAnimation();
    };
  }, [isListening, pulseAnim, rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (loading) {
    return (
      <Animated.View style={styles.buttonWrapper}>
        <GradientBackground variant="disabled" style={styles.recordButton}>
          <ActivityIndicator size="large" color={theme.colors.card} />
        </GradientBackground>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.buttonWrapper,
        {
          transform: [{scale: pulseAnim}, {rotate: spin}],
        },
      ]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <GradientBackground
          variant={isListening ? 'error' : 'default'}
          style={[styles.recordButton]}>
          <View style={isListening ? styles.stopIcon : styles.recordIcon} />
        </GradientBackground>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.extraLarge,
  },
  recordIcon: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.card,
    opacity: 0.9,
  },
  stopIcon: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.small,
    opacity: 0.9,
  },
});

export default VoiceRecordingButton;
