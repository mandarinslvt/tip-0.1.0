import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchBooks, 
  selectAllBooks, 
  selectBooksStatus, 
  selectBooksError 
} from './booksSlice'; // Импортируем наши готовые селекторы

export const BooksList = () => {
    const dispatch = useDispatch<any>(); // Добавили <any>, чтобы TS не ругался на асинхронный thunk
    
    // Используем селекторы из слайса
    const books = useSelector(selectAllBooks);
    const status = useSelector(selectBooksStatus);
    const error = useSelector(selectBooksError);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBooks());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return <div>⏳ Загрузка книг...</div>;
    }

    if (status === 'failed') {
        return <div style={{ color: 'red' }}>❌ Ошибка: {error}</div>;
    }

    if (status === 'succeeded' && books.length === 0) {
        return <div>📚 Нет доступных книг</div>;
    }

    return (
    <div>
        <h2>Список книг</h2>
        <ul>
            {books.map((book) => (
                <li key={book.id}>
                    <strong>{book.title}</strong> — {book.author} 
                    {/* Исправили book.available на book.isAvailable */}
                    <span> (Доступно: {book.isAvailable ? ' Да' : ' Нет'})</span>
                </li>
            ))}
        </ul>
    </div>
    );
};
