import { createSlice, configureStore } from '@reduxjs/toolkit';

import type { BreedMap } from './breed/actions';
import breedReducers from './breed/reducers';
import imageGridReducers from './imageGrid/reducers';
export interface State {
  breeds?: BreedMap;
  images: string[];
  combos: Combo[];
}
export const SelectCombos = (state: State): Combo[] => state.combos;
export const SelectImages = (state: State): string[] => state.images;
export interface Combo {
  breed: string;
  subBreed: string;
  count: number;
}
const initialState: State = {
  breeds: undefined,
  images: [],
  combos: [{ breed: '', subBreed: '', count: 1 }],
};
const breedSlice = createSlice({
  name: 'eezy-demo',
  initialState,
  reducers: {
    changeCombo: (
      state: State,
      { payload }: { payload: { combo: Combo; index: number } },
    ) => {
      const { combo, index } = payload;
      state.combos = state.combos.map((p, i) => {
        if (i === index) {
          return combo;
        }
        return p;
      });
    },
    addCombo: (state: State, { payload }: { payload: Combo }) => {
      state.combos = state.combos.concat(payload);
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
export const { addCombo, changeCombo, clearImages } = breedSlice.actions;

export const store = configureStore({
  reducer: breedSlice.reducer,
  devTools: import.meta.env.MODE === 'development',
});
