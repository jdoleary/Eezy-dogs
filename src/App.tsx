import React, { useEffect } from 'react';
import { Button, Container } from '@material-ui/core';

import { Provider, useSelector } from 'react-redux';
import { store, SelectCombos, clearImages } from './store';
import { fetchAllBreeds } from './breed/actions';
import { fetchImages } from './imageGrid/actions';
import BreedComboChooser from './breed/ComboChooser';
import Modal from './imageGrid/Modal';
import './App.css';

interface AppProps {}

function App({}: AppProps) {
  useEffect(() => {
    store.dispatch(fetchAllBreeds());
  }, []);
  return (
    <div className="App">
      <Provider store={store}>
        <Choosers />
        <GenerateButton />
        <Modal />
      </Provider>
    </div>
  );
}
function GenerateButton() {
  const combos = useSelector(SelectCombos);
  return (
    <Button
      color="primary"
      onClick={() => {
        // Remove previous images
        store.dispatch(clearImages());
        for (let combo of combos) {
          store.dispatch(fetchImages(combo));
        }
      }}
    >
      Generate
    </Button>
  );
}
function Choosers() {
  const combos = useSelector(SelectCombos);
  return (
    <Container maxWidth="md">
      {combos.map((p, i) => {
        const key = p.breed ? `${p.breed}-${p.subBreed}` : i;
        return (
          <BreedComboChooser
            key={key}
            combo={p}
            index={i}
            lastInList={i === combos.length - 1}
          />
        );
      })}
    </Container>
  );
}

export default App;
