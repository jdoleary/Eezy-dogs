import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box, TextField, IconButton } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

import {
  addCombo,
  removeCombo,
  changeCombo,
  Combo,
  State,
  store,
} from '../store';
import Selector from './Selector';

const SelectBreeds = (state: State) => state.breeds || {};

interface ComboChooserProps {
  combo: Combo;
  lastInList: boolean;
  index: number;
}
export default function ComboChooser({
  combo,
  lastInList,
  index,
}: ComboChooserProps) {
  const { breed, subBreed, count } = combo;
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
            store.dispatch(changeCombo({ combo: { ...combo, breed }, index }));
          }}
        />
        <Selector
          name="SubBreed"
          options={breeds[breed]}
          value={subBreed}
          onChange={(_event: any, subBreed: string) => {
            store.dispatch(
              changeCombo({ combo: { ...combo, subBreed }, index }),
            );
          }}
        />
        <TextField
          variant="outlined"
          type="number"
          value={count}
          onChange={(event: any) => {
            store.dispatch(
              changeCombo({
                combo: { ...combo, count: event.target.value },
                index,
              }),
            );
          }}
        ></TextField>
        <Box component="div">
          {lastInList ? (
            <IconButton
              color="primary"
              aria-label="add row"
              component="span"
              onClick={() => {
                store.dispatch(addCombo({ breed: '', subBreed: '', count: 1 }));
              }}
            >
              <AddCircle />
            </IconButton>
          ) : (
            <IconButton
              color="primary"
              aria-label="remove row"
              component="span"
              onClick={() => {
                store.dispatch(removeCombo(index));
              }}
            >
              <RemoveCircle />
            </IconButton>
          )}
        </Box>
      </Grid>
    </Box>
  );
}
