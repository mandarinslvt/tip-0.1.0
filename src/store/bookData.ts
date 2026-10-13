import axios from 'axios';
import { mockBooks } from '../mocks/books'; 
import type { IBook } from '../types/book.types';

// Используем правильный домен jsonplaceholder (или ваш локальный бэкенд)
const API_BASE_URL = 'https://typicode.com';

export const bookDataService = {
  async getAllBooks(): Promise<IBook[]> {
    const response = await axios.get<IBook[]>(`${API_BASE_URL}/books`);
    return response.data;
  }
};
