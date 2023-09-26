import {configureStore} from "@reduxjs/toolkit";
import { rememberReducer, rememberEnhancer } from 'redux-remember';
import authSlice from "./reducers/authSlice";

const rememberedKeys = [ 'auth' ];//here we write a name of our slice

export const store = configureStore({
    reducer: rememberReducer({
      auth:authSlice
    }),
    enhancers: [rememberEnhancer(
      window.localStorage,
      rememberedKeys,
      { persistWholeStore: true }
    )]
  })