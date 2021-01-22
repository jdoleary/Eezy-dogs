import { createSlice, configureStore } from '@reduxjs/toolkit';

import type { BreedMap } from './breed/actions';
import breedReducers from './breed/reducers';
import imageGridReducers from './imageGrid/reducers';
interface Error {
  [storeContentKey: string]: string;
}
interface Loading {
  [storeContentKey: string]: boolean;
}
export interface State {
  loading: Loading;
  error: Error;
  breeds?: BreedMap;
  images: string[];
  combos: Combo[];
}
export const SelectCombos = (state: State): Combo[] => state.combos;
export const SelectLoading = (state: State): Loading => state.loading;
export const SelectError = (state: State): Error => state.error;
export const SelectImages = (state: State): string[] => state.images;
export interface Combo {
  breed: string;
  subBreed: string;
  count: number;
}
const initialState: State = {
  loading: {},
  error: {},
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
          // Clamp value between 1 and 100 inclusive
          combo.count = Math.min(Math.max(combo.count, 1), 100);
          return combo;
        }
        return p;
      });
    },
    addCombo: (state: State, { payload }: { payload: Combo }) => {
      state.combos = state.combos.concat(payload);
    },
    removeCombo: (state: State, { payload: index }: { payload: number }) => {
      state.combos = [
        ...state.combos.slice(0, index),
        ...state.combos.slice(index + 1),
      ];
    },
    clearImages: (state: State) => {
      // Clear image errors and images in list
      state.error = {...state.error, images: ''};
      state.images = [];
    },
  },
  extraReducers: {
    ...breedReducers,
    ...imageGridReducers,
  },
});
export const {
  addCombo,
  removeCombo,
  changeCombo,
  clearImages,
} = breedSlice.actions;

export const store = configureStore({
  reducer: breedSlice.reducer,
  devTools: import.meta.env.MODE === 'development',
});
