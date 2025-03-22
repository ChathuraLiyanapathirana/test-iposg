// Simple theme configuration for the application
import {FontWeight, Shadow} from '../types/app';

export const theme = {
  // Main color palette
  colors: {
    primary: '#3f51b5',
    primaryDark: '#303f9f',
    primaryLight: '#7986cb',
    accent: '#f50057',
    background: '#f5f5f5',
    card: '#ffffff',
    text: '#212121',
    textSecondary: '#757575',
    border: '#e0e0e0',
    error: '#f44336',
    success: '#4caf50',
    info: '#2196f3',
    warning: '#ff9800',
    disabled: '#bdbdbd',
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

  // Shadows
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    } as Shadow,
    medium: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 3,
    } as Shadow,
    large: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 6,
    } as Shadow,
  },
};
