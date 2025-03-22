import {ApiResponse} from '../../types/app';
import {sendQuery} from './apiClient';

export const processAndSendText = async (
  text: string,
): Promise<ApiResponse> => {
  const processedText = text.trim();

  if (!processedText) {
    return {
      success: false,
      type: 'error',
      data: {
        message: 'Query text cannot be empty',
      },
    };
  }

  return sendQuery(processedText);
};
