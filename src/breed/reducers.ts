import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchAllBreeds, BreedMap } from './actions';
import type { State } from '../store';

export default {
  [fetchAllBreeds.pending.toString()]: (
    state: State,
    _action: PayloadAction<BreedMap>,
  ) => {
    state.loading = { ...state.loading, breeds: true };
  },
  [fetchAllBreeds.fulfilled.toString()]: (
    state: State,
    action: PayloadAction<BreedMap>,
  ) => {
    state.breeds = action.payload;
    state.loading = { ...state.loading, breeds: false };
  },
};
