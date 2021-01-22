import React, { useEffect } from 'react';
import { Button, Container } from '@material-ui/core';

import { Provider, useSelector } from 'react-redux';
import { store, SelectPairs } from './store';
import { fetchAllBreeds } from './breed/actions';
import {fetchImages} from './imageGrid/actions';
import BreedPairChooser from './breed/PairChooser';
import Modal from './imageGrid/Modal'
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
        <GenerateButton/>
        <Modal/>
      </Provider>
    </div>
  );
}
function GenerateButton() {
  const pairs = useSelector(SelectPairs);
  return (
        <Button
          color="primary"
          onClick={() => {
            for(let pair of pairs){
              store.dispatch(fetchImages(pair));
            }
          }}
        >
          Generate
        </Button>

  )
}
function Choosers() {
  const pairs = useSelector(SelectPairs);
  return (
    <Container maxWidth="md">
      {pairs.map((p, i) => {
        return (
          <BreedPairChooser
            key={`${p.breed}-${p.subBreed}`}
            pair={p}
            index={i}
            includeAddBtn={i === pairs.length - 1}
          />
        );
      })}
    </Container>
  );
}

export default App;
