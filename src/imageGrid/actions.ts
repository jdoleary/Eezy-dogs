import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import type { Pair } from 'src/store';

export interface BreedMap {
  [breed: string]: string[];
}
export const fetchImages: AsyncThunk<
  BreedMap,
  Pair,
  {}
> = createAsyncThunk(
  'imageGrid',
  async (pair:Pair) =>
    await fetch(`https://dog.ceo/api/breed/${pair.breed}${pair.subBreed ? '/' + pair.subBreed : ''}/images/random/${pair.count}`)
      .then((response) => response.json())
);
