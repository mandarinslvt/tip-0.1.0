import { configureStore } from '@reduxjs/toolkit';
import { readerSlice } from './readers-slice';

export const store = configureStore({
    reducer:{
        readers: readerSlice.reducer,
    }
});