import React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
interface SelectorProps {
  name: string;
  value: string;
  onChange: any;
  options: string[];
}
export default function Selector({
  name,
  value,
  onChange,
  options = [],
}: SelectorProps) {
  return (
    <Autocomplete
      id={name.toLowerCase()}
      disabled={options.length === 0}
      options={options}
      getOptionLabel={(option: string) => option}
      value={value}
      onChange={onChange}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label={name} variant="outlined" />
      )}
    />
  );
}
