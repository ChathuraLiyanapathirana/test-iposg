import {useState} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import {UseMicrophonePermissionReturn} from '../types/app';

/**
 * Custom hook for handling microphone permissions
 * Manages permission requests for Android and iOS platforms
 */
export const useMicrophonePermission = (): UseMicrophonePermissionReturn => {
  const [permissionError, setPermissionError] = useState('');

  /**
   * Request RECORD_AUDIO permission for Android devices
   * For iOS, permission is handled by the system when microphone is accessed
   * @returns A boolean indicating whether permission is granted
   */
  const requestMicrophonePermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
      return true;
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message:
            'This app needs access to your microphone for voice recognition',
          buttonPositive: 'OK',
        },
      );

      const isGranted = granted === PermissionsAndroid.RESULTS.GRANTED;

      if (!isGranted) {
        setPermissionError('Microphone permission not granted');
      } else {
        setPermissionError('');
      }

      return isGranted;
    } catch (err: unknown) {
      console.warn('Permission request error:', err);
      setPermissionError('Failed to request microphone permission');
      return false;
    }
  };

  return {
    requestMicrophonePermission,
    permissionError,
  };
};

export default useMicrophonePermission;
