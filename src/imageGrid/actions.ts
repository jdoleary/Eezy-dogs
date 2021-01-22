import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import type { Combo } from 'src/store';

export const fetchImages: AsyncThunk<
  { status: string; message: string[] } | { message: string },
  Combo[],
  {}
> = createAsyncThunk('imageGrid', async (combos: Combo[]) => {
  if (combos.length === 1 && !combos[0].breed) {
    return Promise.resolve({
      message: 'Please specify a breed before generating',
    });
  }
  const imagesNonFlat: { message: string[] }[] = await Promise.all(
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
    message: imagesNonFlat.reduce<string[]>(
      (flattenedImages, arrayOfImages) => [
        ...flattenedImages,
        ...arrayOfImages.message,
      ],
      [],
    ),
  };
});
