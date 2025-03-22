import {ApiResponse, ApiQueryRequest} from '../../types/app';

// Local development API URL - change for production
const API_BASE_URL = 'http://192.168.11.200:5001/api';
export const sendQuery = async (query: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({query} as ApiQueryRequest),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      type: 'error',
      data: {
        message: 'Failed to connect to the server',
      },
    };
  }
};
