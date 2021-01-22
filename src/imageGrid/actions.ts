import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import type { Combo } from 'src/store';

export interface BreedMap {
  [breed: string]: string[];
}
export const fetchImages: AsyncThunk<BreedMap, Combo, {}> = createAsyncThunk(
  'imageGrid',
  async (combo: Combo) =>
    await fetch(
      `https://dog.ceo/api/breed/${combo.breed}${
        combo.subBreed ? '/' + combo.subBreed : ''
      }/images/random/${combo.count}`,
    ).then((response) => response.json()),
);
