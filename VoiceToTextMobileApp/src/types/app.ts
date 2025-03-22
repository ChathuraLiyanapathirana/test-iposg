import {TextStyle, ViewStyle} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

// Theme related types
export type FontWeight = TextStyle['fontWeight'];
export type Shadow = Pick<
  ViewStyle,
  | 'shadowColor'
  | 'shadowOffset'
  | 'shadowOpacity'
  | 'shadowRadius'
  | 'elevation'
>;

export interface RecordButtonProps {
  isListening: boolean;
  onPress: () => void;
}

// API Response types
export interface ApiErrorResponse {
  success: false;
  type: 'error';
  data: {
    message: string;
  };
}

export interface ApiSuccessResponse {
  success: true;
  type: 'success';
  data: {
    message: string;
    items?: any[];
    type:
      | 'weather'
      | 'time'
      | 'location'
      | 'products'
      | 'help'
      | 'hours'
      | 'general';
  };
}

// API Client types
export interface ApiQueryRequest {
  query: string;
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

// Store related types
export interface ApiState {
  response: ApiResponse | null;
  loading: boolean;
  error: string | null;
  sendText: (text: string) => Promise<void>;
  resetResponse: () => void;
}

// Navigation types
export type RootStackParamList = {
  Record: undefined;
  Results: undefined;
};

export type RecordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Record'
>;

export type ResultsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Results'
>;

// Hook interfaces
export interface UseSpeechRecognitionReturn {
  isListening: boolean;
  partialText: string;
  finalText: string;
  error: string;
  startListening: () => Promise<void>;
  stopListening: () => Promise<void>;
}

export interface UseMicrophonePermissionReturn {
  requestMicrophonePermission: () => Promise<boolean>;
  permissionError: string;
}

// Button Components
export interface RecordButtonProps {
  isListening: boolean;
  onPress: () => void;
}

export interface VoiceRecordingButtonProps {
  isListening: boolean;
  loading: boolean;
  onPress: () => void;
}

// Card Components
export interface ApiResponseCardProps {
  response: ApiSuccessResponse;
}

// Header Components
export interface ScreenHeaderProps {
  title: string;
}

// RecordingStatus Components
export interface RecordingStatusProps {
  isListening: boolean;
  displayText: string;
  error?: string;
}

// Footer Components
export interface ActionButtonProps {
  label: string;
  onPress: () => void;
}

export interface ActionFooterProps {
  actions: ActionButtonProps[];
}
