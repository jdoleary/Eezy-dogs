import {
  createSlice,
  configureStore,
} from '@reduxjs/toolkit';

import type {BreedMap} from './breed/actions'
import breedReducers from './breed/reducers'
export interface State {
  breeds?: BreedMap;
  pairs: Pair[];
}
export interface Pair {
  breed: string;
  subBreed: string;
  count: number;
}
const initialState: State = {
  breeds: undefined,
  pairs: [
    { breed: 'bulldog', subBreed: '', count: 0 },
    { breed: '', subBreed: '', count: 0 },
  ],
};
const breedSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {
    addPair: (state: State, { payload }: { payload: Pair }) => {
      state.pairs = state.pairs.concat(payload);
    },
  },
  extraReducers: {
    ...breedReducers
  },
});
export const { addPair } = breedSlice.actions;

export const store = configureStore({
  reducer: breedSlice.reducer,
  devTools: import.meta.env.MODE === 'development',
});

