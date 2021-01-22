import React from 'react';
import { useSelector } from 'react-redux';
import type { State } from '../store';

const SelectBreeds = (state: State) => state.breeds || {};

export default function ComboChooser({ WrappedComponent, ...props }: any) {
  const breeds = useSelector(SelectBreeds);
  return <WrappedComponent {...props} breeds={breeds} />;
}
