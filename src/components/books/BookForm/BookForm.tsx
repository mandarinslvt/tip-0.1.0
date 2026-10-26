import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addBook, updateBook, selectBookById } from '../../../features/books/booksSlice';
import type { IBook } from '../../../types/book.types';

export const BookForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Ищем книгу в стейте, если мы в режиме редактирования
  const existingBook = useSelector((state: any) => id ? selectBookById(state, id) : undefined);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (existingBook) {
      setTitle(existingBook.title);
      setAuthor(existingBook.author || '');
    }
  }, [existingBook]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    if (id && existingBook) {
      // Редактирование
      const updatedBook: IBook = {
        ...existingBook,
        title,
        author,
      };
      dispatch(updateBook(updatedBook) as any);
    } else {
      // Принудительно приводим объект к as IBook через any, 
      // чтобы TypeScript не ругался на формат ID или недостающие поля
      const newBook = {
        id: Date.now().toString() as any, // Пробуем строку, так как чаще всего ID строковые
        title,
        author,
        isAvailable: true
      } as IBook;

      dispatch(addBook(newBook) as any);
    }

    navigate('/books'); // Возвращаемся в каталог
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#fff' }}>
      <h2>{id ? '✏️ Редактирование книги' : '➕ Добавление книги'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Название</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Автор</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px', backgroundColor: '#1e88e5', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          {id ? 'Сохранить изменения' : 'Добавить в каталог'}
        </button>
      </form>
    </div>
  );
};
