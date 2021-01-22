import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchImages } from './actions';
import type { State } from '../store';

export default {
  [fetchImages.fulfilled.toString()]: (
    state: State,
    action: PayloadAction<string[]>,
  ) => {
    state.images = [...state.images, ...action.payload]
  },
};
