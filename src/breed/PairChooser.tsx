import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box, TextField, IconButton } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';

import { addPair, changePair, Pair, State, store } from '../store';
import Selector from './Selector';

const SelectBreeds = (state: State) => state.breeds || {};

interface PairChooserProps {
  pair: Pair;
  includeAddBtn: boolean;
  index: number;
}
export default function PairChooser({
  pair,
  includeAddBtn,
  index,
}: PairChooserProps) {
  const { breed, subBreed, count } = pair;
  const breeds = useSelector(SelectBreeds);
  return (
    <Box m={2}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Selector
          name="Breed"
          options={Object.keys(breeds)}
          value={breed}
          onChange={(_event: any, breed: string) => {
            store.dispatch(changePair({ pair: { ...pair, breed }, index }));
          }}
        />
        <Selector
          name="SubBreed"
          options={breeds[breed]}
          value={subBreed}
          onChange={(_event: any, subBreed: string) => {
            store.dispatch(changePair({ pair: { ...pair, subBreed }, index }));
          }}
        />
        <TextField
          variant="outlined"
          type="number"
          value={count}
          onChange={(event: any) => {
            store.dispatch(
              changePair({
                pair: { ...pair, count: event.target.value },
                index,
              }),
            );
          }}
        ></TextField>
        <Box component="div" visibility={includeAddBtn ? 'visible' : 'hidden'}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => {
              store.dispatch(addPair({ breed: '', subBreed: '', count: 0 }));
            }}
          >
            <AddCircle />
          </IconButton>
        </Box>
      </Grid>
    </Box>
  );
}
