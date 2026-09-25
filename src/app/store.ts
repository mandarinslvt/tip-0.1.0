import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice';     
import readersReducer from '../features/readers/readersSlice';

export const store = configureStore({
    reducer: {
        books: booksReducer,
        readers: readersReducer,
    },
});

// Экспортируем типы для TypeScript, чтобы в компонентах (например, ReadersList) не было ошибок
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;