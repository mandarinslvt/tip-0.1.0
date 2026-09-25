import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from './booksSlice';
export const BooksList = () => {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.items);
    const status = useSelector((state) => state.books.status);
    const error = useSelector((state) => state.books.error);
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBooks());
        }
    }, [status, dispatch]);
    if (status === 'loading') {
        return <div> Загрузка книг...</div>;
    }
    if (status === 'failed') {
        return <div> Ошибка: {error}</div>;
    }
    if (status === 'succeeded' && books.length === 0) {
        return <div> Нет доступных книг</div>;
    }
    return (
    <div>
        <h2>Список книг</h2>
        <ul>
            {books.map((book) => (
                <li key={book.id}>
                    {book.title} — {book.author} (Доступно: {book.available})
                </li>
            ))}
        </ul>
    </div>
    );
};