import React, { useEffect } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  Box,
  AppBar,
  Typography,
  Toolbar,
} from '@material-ui/core';

import { Provider, useSelector } from 'react-redux';
import { store, SelectCombos, SelectLoading, clearImages } from './store';
import { fetchAllBreeds } from './breed/actions';
import { fetchImages } from './imageGrid/actions';
import BreedComboChooser from './breed/ComboChooser';
import WithBreeds from './breed/WithBreeds';
import Modal from './imageGrid/Modal';
import './App.css';

interface AppProps {}

function App({}: AppProps) {
  useEffect(() => {
    store.dispatch(fetchAllBreeds());
  }, []);
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Dog Breeds</Typography>
        </Toolbar>
      </AppBar>
      <Provider store={store}>
        <Box p={2}>
          <Main />
        </Box>
      </Provider>
    </div>
  );
}
function Main() {
  const loading = useSelector(SelectLoading);
  return loading.breeds ? (
    <CircularProgress />
  ) : (
    <>
      <Choosers />
      <GenerateButton />
      <Modal />
    </>
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
        store.dispatch(fetchImages(combos));
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
          <WithBreeds
            WrappedComponent={BreedComboChooser}
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
