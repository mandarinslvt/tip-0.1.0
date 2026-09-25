import { configureStore } from '@reduxjs/toolkit';
import { readerSlice } from './readersSlice';

export const store = configureStore({
    reducer:{
        readers: readerSlice.reducer,
    }
});