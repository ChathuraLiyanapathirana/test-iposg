import {create} from 'zustand';
import {ApiState} from '../types/app';
import {processAndSendText} from '../services/api';

export const useApiStore = create<ApiState>(set => ({
  response: null,
  loading: false,
  error: null,

  sendText: async (text: string) => {
    try {
      set({loading: true, error: null});
      const response = await processAndSendText(text);
      set({response, loading: false});
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        loading: false,
      });
    }
  },

  resetResponse: () => {
    set({response: null, error: null});
  },
}));
