import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockBooks } from '../mocks/books';
import type { IBook } from '../types/book.types';

interface BooksState {
  items: IBook[];
}

const initialState: BooksState = {
  items: mockBooks,
};

export const selectBookById = (state: { books: BooksState }, bookId: string) => 
  state.books.items.find(book => book.id === bookId);
