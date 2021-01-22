import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchImages } from './actions';
import type { State } from '../store';

export default {
  [fetchImages.fulfilled.toString()]: (
    state: State,
    action: PayloadAction<{ status: string; message: string[] }>,
  ) => {
    const { status, message } = action.payload;
    if (status === 'success') {
      state.images = [...state.images, ...message];
    }
  },
};
