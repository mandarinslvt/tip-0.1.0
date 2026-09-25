import { createSlice } from '@reduxjs/toolkit';
import { mockReaders } from '../mocks/readers';
import type { IReader } from '../types/reader.types';
type ReaderSlice = {
  readers: IReader[];
  error: string;
}
const initialState: ReaderSlice = {
  readers: mockReaders,
  error: '',
};
export const readerSlice = createSlice({
  name: 'readers',
  initialState,
  reducers: {}
});