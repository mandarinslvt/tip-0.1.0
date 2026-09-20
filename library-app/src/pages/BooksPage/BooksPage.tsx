import { useState, useMemo } from 'react';
import BookList from '../../components/books/BookList/BookList';
import BookSearch from '../../components/books/BookSearch/BookSearch'; 
import { mockBooks } from '../../mocks/books';
import '../BooksPage/BooksPage.css';

const BooksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return mockBooks;
    
    return mockBooks.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <>
      <h1 className="page-title">Каталог книг</h1>

      <p className="page-subtitle">
        Всего книг: <strong>{mockBooks.length}</strong>
      </p>

      <div className="page-toolbar">
        <BookSearch onSearch={setSearchQuery} />
        {searchQuery && (
          <span className="search-result-count">
            Найдено: {filteredBooks.length}
          </span>
        )}
      </div>

      <BookList books={filteredBooks} />
    </>
  );
};

export default BooksPage;