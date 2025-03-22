// Modern theme configuration for the application
import {FontWeight, Shadow} from '../types/app';

export const theme = {
  // Main color palette - improved with more modern and vibrant colors
  colors: {
    primary: '#6200EE', // Deep purple - primary brand color
    primaryDark: '#3700B3', // Darker variant
    primaryLight: '#BB86FC', // Light variant
    accent: '#03DAC5', // Teal accent color
    background: '#F9F9FB', // Slightly off-white background
    card: '#FFFFFF', // Pure white for cards
    text: '#1F1F1F', // Nearly black for primary text
    textSecondary: '#6E6E6E', // Darker secondary text for better readability
    border: '#E5E5E5', // Subtle border color
    error: '#CF6679', // Softer error color
    success: '#01A299', // Modern success color
    info: '#2196F3', // Information blue
    warning: '#FF9800', // Warning orange
    disabled: '#BDBDBD', // Disabled state
    gradientStart: '#6200EE', // For gradients
    gradientEnd: '#9D6FFF', // For gradients
    surface: '#FFFFFF', // Surface color
    overlay: 'rgba(0,0,0,0.5)', // Overlay for modals/dialogs
  },

  // Spacing units
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },

  // Typography
  typography: {
    fontFamily: 'System',

    // Font sizes
    fontSize: {
      small: 12,
      regular: 14,
      medium: 16,
      large: 18,
      xlarge: 20,
      xxlarge: 24,
      xxxlarge: 32,
    },

    // Font weights
    fontWeight: {
      regular: '400' as FontWeight,
      medium: '500' as FontWeight,
      semibold: '600' as FontWeight,
      bold: '700' as FontWeight,
    },
  },

  // Border radius
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    round: 9999,
  },

  // Enhanced shadows for more depth and material design feel
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.12,
      shadowRadius: 2.0,
      elevation: 2,
    } as Shadow,
    medium: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.16,
      shadowRadius: 6.0,
      elevation: 4,
    } as Shadow,
    large: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.23,
      shadowRadius: 8.0,
      elevation: 8,
    } as Shadow,
    extraLarge: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.3,
      shadowRadius: 12.0,
      elevation: 12,
    } as Shadow,
  },
  // Animation timing
  animation: {
    short: 150,
    medium: 300,
    long: 450,
  },
};
