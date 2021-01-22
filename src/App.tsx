import React, {useEffect} from 'react';
import { Button, Container } from '@material-ui/core';

import { Provider, useSelector } from 'react-redux';
import { store, Pair, State } from './store';
import {fetchAllBreeds} from './breed/actions'
import BreedPairChooser from './breed/PairChooser'
import './App.css';

const SelectPairs = (state: State): Pair[] => state.pairs;

interface AppProps {}

function App({}: AppProps) {
  useEffect(() => {
    store.dispatch(fetchAllBreeds());
  }, [])
  return (
    <div className="App">
      <Provider store={store}>
        <Choosers />
        <Button
          color="primary"
          onClick={() => {
            alert('TODO')
          }}
        >
          Generate
        </Button>
      </Provider>
    </div>
  );
}
function Choosers() {
  const pairs = useSelector(SelectPairs);
  return (
    <Container maxWidth="md">
      {pairs.map((p, i) => {
        return (
          <BreedPairChooser key={`${p.breed}-${p.subBreed}`} pair={p} index={i} includeAddBtn={i === pairs.length-1}/>
        );
      })}
    </Container>
  );
}

export default App;
