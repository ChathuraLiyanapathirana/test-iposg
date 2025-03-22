import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {theme} from '../../styles/theme';
import {RecordingStatusProps} from '../../types/app';
import {GradientBackground} from '../Gradient/GradientBackground';

export const RecordingStatus: React.FC<RecordingStatusProps> = ({
  isListening,
  displayText,
  error,
}) => {
  // Animation for status indicator
  const [pulseAnim] = React.useState(new Animated.Value(1));

  React.useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      // Reset animation when not listening
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    return () => pulseAnim.stopAnimation();
  }, [isListening, pulseAnim]);

  return (
    <GradientBackground variant="card" style={styles.container}>
      {isListening && (
        <Animated.View
          style={[
            styles.listeningIndicator,
            {
              transform: [{scale: pulseAnim}],
            },
          ]}
        />
      )}
      <View style={styles.textContainer}>
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
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: theme.spacing.l,
    marginBottom: theme.spacing.xl,
  },
  textContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.m,
    backgroundColor: `${theme.colors.card}80`,
    borderRadius: theme.borderRadius.medium,
  },
  recognizedText: {
    fontSize: theme.typography.fontSize.xxxlarge,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
    color: theme.colors.text,
    letterSpacing: -0.5,
  },
  instructionText: {
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  errorText: {
    marginTop: theme.spacing.l,
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.error,
    textAlign: 'center',
    fontWeight: theme.typography.fontWeight.medium,
  },
  listeningIndicator: {
    position: 'absolute',
    top: '35%',
    width: 20,
    height: 20,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.card,
  },
});

export default RecordingStatus;
