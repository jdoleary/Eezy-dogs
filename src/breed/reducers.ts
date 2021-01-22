import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchAllBreeds, BreedMap } from './actions';
import type { State } from '../store';

export default {
  [fetchAllBreeds.fulfilled.toString()]: (
    state: State,
    action: PayloadAction<BreedMap>,
  ) => {
    state.breeds = action.payload;
  },
};
