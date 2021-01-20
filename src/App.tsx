import React, { Suspense } from 'react';
import './App.css';
import { Button, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Provider, useSelector} from 'react-redux'

import {store, incremented} from './store'

const SelectCounter = (state:any) => state.value

import { fetchProfileData } from "./fakeApi";

const resource = fetchProfileData();
interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <Provider store={store}>
      <Suspense
        fallback={<h1>Loading posts...</h1>}
      >
        <ProfileTimeline />
      </Suspense>
        <Button color="primary" onClick={()=>{store.dispatch(incremented())}}>Material UI</Button>
      </Provider>
    </div>
  );
}
function ProfileTimeline() {
  const counter = useSelector(SelectCounter)
  // Try to read posts, although they might not have loaded yet
  const posts = resource.posts.read();
  return (
    <ul>
      <pre>{JSON.stringify(counter, null, 2)}</pre>
      {Object.keys(posts).slice(0,4).map((post:any) => (
        <li key={post}>{post}</li>
      ))}
      <Autocomplete
  id="breed"
  options={Object.keys(posts)}
  getOptionLabel={(option:any) => option}
  style={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Breed" variant="outlined" />}
/>
    </ul>
  );
}

export default App;
