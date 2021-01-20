import { createSlice, configureStore, createAsyncThunk, AsyncThunk, PayloadAction } from '@reduxjs/toolkit'
interface TestResponse{
    data:number[]
}
type TestArgs = number;
// First, create the thunk
const fetchUserById : AsyncThunk<number[], TestArgs, {}> = createAsyncThunk(
  'users/fetchByIdStatus',
  async (t: TestArgs) => {
    const response:TestResponse = await new Promise((res, rej) => {
        setTimeout(() => res({data:[1,2,3]}),4000);
    })
    return response.data
  }
)
interface State {
    value:number,
    entities:number[]
}
const initialState:State = {
    value:0,
    entities:[]
}
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incremented: (state:State) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decremented: (state:State) => {
      state.value -= 1
    }
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchUserById.fulfilled.toString()]: (state, action: PayloadAction<number>) => {
      // Add user to the state array
      state.entities.push(action.payload)
    }
  }
})
export const { incremented, decremented } = counterSlice.actions

export const store = configureStore({
  reducer: counterSlice.reducer
})

store.dispatch(fetchUserById(123))