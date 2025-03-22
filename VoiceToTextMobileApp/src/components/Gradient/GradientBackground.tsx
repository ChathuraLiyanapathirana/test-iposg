import React, {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../../styles/theme';

type GradientVariant = 'default' | 'card' | 'error' | 'disabled';

interface GradientBackgroundProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: GradientVariant;
  colors?: string[];
}

export const GradientBackground = ({
  children,
  style,
  variant = 'default',
  colors: customColors,
}: GradientBackgroundProps) => {
  // Predefined gradient color combinations
  const gradientColors = {
    default: [theme.colors.gradientStart, theme.colors.gradientEnd],
    card: [theme.colors.gradientEnd, theme.colors.card],
    error: [theme.colors.error, theme.colors.error],
    disabled: [theme.colors.disabled, theme.colors.disabled],
  };

  // Use custom colors if provided, otherwise use the variant colors
  const colors = customColors || gradientColors[variant];

  return (
    <LinearGradient colors={colors} style={style}>
      {children}
    </LinearGradient>
  );
};
