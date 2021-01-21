
import {
  createAsyncThunk,
  AsyncThunk,
} from '@reduxjs/toolkit';

export interface BreedMap {
  [breed: string]: string[];
}
type FetchAllBreedsArgs = void;
export const fetchAllBreeds: AsyncThunk<
  BreedMap,
  FetchAllBreedsArgs,
  {}
> = createAsyncThunk(
  'breeds',
  async () =>
    await fetch('https://dog.ceo/api/breeds/list/all')
      .then((response) => response.json())
      .then((json) => json.message),
);