import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import type { Combo } from 'src/store';

interface Response {
  status: string;
  message: string[];
}

export const fetchImages: AsyncThunk<
  Response | { message: string },
  Combo[],
  {}
> = createAsyncThunk('imageGrid', async (combos: Combo[]) => {
  if (combos.length === 1 && !combos[0].breed) {
    return Promise.resolve({
      message: 'Please specify a breed before generating',
    });
  }
  const responses: Response[] = await Promise.all(
    combos.map((combo) =>
      fetch(
        `https://dog.ceo/api/breed/${combo.breed}${
          combo.subBreed ? '/' + combo.subBreed : ''
        }/images/random/${combo.count}`,
      ).then((response) => response.json()),
    ),
  );
  return {
    status: 'success',
    message: responses.reduce<string[]>((flattenedImagePaths, response) => {
      if (response.status !== 'success') {
        return flattenedImagePaths;
      }
      return [...flattenedImagePaths, ...response.message];
    }, []),
  };
});
