import React from 'react';
import { Grid, Box, TextField, IconButton } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import NotInterested from '@material-ui/icons/NotInterested';

import { addCombo, removeCombo, changeCombo, Combo, store } from '../store';
import Selector from './Selector';
import type { BreedMap } from './actions';

interface ComboChooserProps {
  combo: Combo;
  lastInList: boolean;
  index: number;
  breeds: BreedMap;
}
export default function ComboChooser({
  combo,
  lastInList,
  index,
  breeds,
}: ComboChooserProps) {
  const { breed, subBreed, count } = combo;
  const isFirstAndOnly = index === 0 && lastInList;
  return (
    <Box m={2}>
      <Grid container justify="flex-start">
        <Grid item>
          <Selector
            name="Breed"
            options={Object.keys(breeds)}
            value={breed}
            onChange={(_event: any, breed: string) => {
              store.dispatch(
                changeCombo({ combo: { ...combo, breed }, index }),
              );
            }}
          />
        </Grid>
        <Grid item>
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
        </Grid>
        <Grid item>
          <Box width={'100px'}>
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
          </Box>
        </Grid>
        <Grid item>
          <Box component="div" display="flex" flexWrap="nowrap">
            <Box component="div">
              <IconButton
                color="primary"
                aria-label={isFirstAndOnly ? 'clear row' : 'remove row'}
                component="span"
                onClick={() => {
                  // Remove the current combo
                  store.dispatch(removeCombo(index));
                  if (isFirstAndOnly) {
                    // If removing the first and only combo, replace it with a new, empty one
                    store.dispatch(
                      addCombo({ breed: '', subBreed: '', count: 1 }),
                    );
                  }
                }}
              >
                {isFirstAndOnly ? <NotInterested /> : <RemoveCircle />}
              </IconButton>
            </Box>
            <Box component="div" visibility={lastInList ? 'visible' : 'hidden'}>
              <IconButton
                color="primary"
                aria-label="add row"
                component="span"
                onClick={() => {
                  store.dispatch(
                    addCombo({ breed: '', subBreed: '', count: 1 }),
                  );
                }}
              >
                <AddCircle />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
