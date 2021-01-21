
import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, Input, IconButton } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';

import type { State } from '../store';
import Selector from './Selector';

const SelectBreeds = (state: State) => state.breeds || {};

interface PairChooserProps {
  breed: string;
  includeAddBtn: boolean
}
export default function PairChooser({ breed, includeAddBtn }: PairChooserProps) {
  const breeds = useSelector(SelectBreeds);
  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Selector name="Breed" options={Object.keys(breeds)} />
      <Selector name="SubBreed" options={breeds[breed]} />
      <Input></Input>
      {includeAddBtn && <IconButton color="primary" aria-label="upload picture" component="span">
        <AddCircle />
      </IconButton>}
    </Grid>
  );
}