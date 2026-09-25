import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, selectAllBooks, selectBooksStatus, selectBooksError } from '../../store/bookData';
import BookList from '../../components/books/BookList/BookList';
import BookSearch from '../../components/books/BookSearch/BookSearch'; 
import NotFound from '../NotFound/NotFound';

const BooksPage = () => {
  const dispatch = useDispatch<any>();
  const [searchQuery, setSearchQuery] = useState('');

  const books = useSelector(selectAllBooks);
  const status = useSelector(selectBooksStatus);
  const error = useSelector(selectBooksError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  const filteredBooks = useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (!trimmedQuery) return books;
    
    return books.filter((book) =>
      book.title.toLowerCase().includes(trimmedQuery) ||
      book.author?.toLowerCase().includes(trimmedQuery)
    );
  }, [books, searchQuery]);

  // Обработка разных состояний загрузки API (Страница 12 конспекта)
  if (status === 'loading') {
    return <div style={{ textAlign: 'center', padding: '3rem' }}><h2>⏳ Загрузка каталога книг...</h2></div>;
  }

  if (status === 'failed') {
    return <div style={{ textAlign: 'center', padding: '3rem', color: 'red' }}><h2>❌ Ошибка: {error}</h2></div>;
  }

  return (
    <div className="page-container"> 
      <h1 className="page-title">Каталог книг</h1>
      <p className="page-subtitle">Всего книг: <strong>{books.length}</strong></p>

      <div className="page-toolbar">
        <BookSearch onSearch={setSearchQuery} />
        {searchQuery.trim().length > 0 && <span className="search-result-count">Найдено: {filteredBooks.length}</span>}
      </div>

      {filteredBooks.length > 0 ? (
        <BookList books={filteredBooks} />
      ) : (
        <NotFound title="Ничего не найдено" subtitle="" message={`По запросу "${searchQuery}" ничего не нашлось.`} />
      )}
    </div>
  );
};

export default BooksPage;