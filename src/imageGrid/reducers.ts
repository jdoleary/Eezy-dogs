import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchImages } from './actions';
import type { State } from '../store';

const GENERIC_ERROR_STRING = 'Something went wrong! Please try again later.';
export default {
  [fetchImages.pending.toString()]: (state: State) => {
    state.loading = { ...state.loading, images: true };
    // On new request remove any errors
    state.error = { ...state.error, images: '' };
  },
  [fetchImages.rejected.toString()]: (
    state: State,
    _action: PayloadAction<{
      status: string;
      message: string[];
    }>,
  ) => {
    state.loading = { ...state.loading, images: false };
    state.error = {
      ...state.error,
      images: GENERIC_ERROR_STRING,
    };
  },
  [fetchImages.fulfilled.toString()]: (
    state: State,
    action: PayloadAction<{ status: string; message: string[] | string }>,
  ) => {
    const { status, message } = action.payload;
    if (status === 'success') {
      if (isStringArray(message)) {
        state.images = [...state.images, ...message];
        // On successremove any errors
        state.error = { ...state.error, images: '' };
      } else {
        console.error('Was expecting string[], instead got ', message);
        state.error = { ...state.error, images: GENERIC_ERROR_STRING };
      }
    } else {
      // On error, set the error message
      if (isString(message)) {
        state.error = { ...state.error, images: message };
      }
    }
    // Disable loading regardless of success
    state.loading = { ...state.loading, images: false };
  },
};

function isString(s: any): s is string {
  return typeof s === 'string';
}
function isStringArray(s: string[] | string): s is string[] {
  return typeof s[0] === 'string';
}
