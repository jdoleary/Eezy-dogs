import React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
interface BreedSelectorProps {
  name: string;
  breeds: string[];
}
export default function BreedSelector({
  name,
  breeds = [],
}: BreedSelectorProps) {
  return (
    <Autocomplete
      id={name.toLowerCase()}
      disabled={breeds.length === 0}
      options={breeds}
      getOptionLabel={(option: string) => option}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label={name} variant="outlined" />
      )}
    />
  );
}
