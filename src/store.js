import { configureStore } from '@reduxjs/toolkit'
import jobReducer from './slices/jobs';

const reducer = {
  jobs: jobReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;