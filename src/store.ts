import { createSlice, configureStore } from '@reduxjs/toolkit';

import type { BreedMap } from './breed/actions';
import breedReducers from './breed/reducers';
import imageGridReducers from './imageGrid/reducers';
export interface State {
  breeds?: BreedMap;
  images: string[];
  pairs: Pair[];
}
export const SelectPairs = (state: State): Pair[] => state.pairs;
export const SelectImages = (state: State): string[] => state.images;
export interface Pair {
  breed: string;
  subBreed: string;
  count: number;
}
const initialState: State = {
  breeds: undefined,
  images: [],
  pairs: [{ breed: '', subBreed: '', count: 1 }],
};
const breedSlice = createSlice({
  name: 'eezy-demo',
  initialState,
  reducers: {
    changePair: (
      state: State,
      { payload }: { payload: { pair: Pair; index: number } },
    ) => {
      const { pair, index } = payload;
      state.pairs = state.pairs.map((p, i) => {
        if (i === index) {
          return pair;
        }
        return p;
      });
    },
    addPair: (state: State, { payload }: { payload: Pair }) => {
      state.pairs = state.pairs.concat(payload);
    },
    clearImages: (state: State) => {
      state.images = [];
    },
  },
  extraReducers: {
    ...breedReducers,
    ...imageGridReducers,
  },
});
export const { addPair, changePair, clearImages } = breedSlice.actions;

export const store = configureStore({
  reducer: breedSlice.reducer,
  devTools: import.meta.env.MODE === 'development',
});
