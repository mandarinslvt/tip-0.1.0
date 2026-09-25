import { useState, useMemo } from 'react';
import BookList from '../../components/books/BookList/BookList';
import BookSearch from '../../components/books/BookSearch/BookSearch'; 
import { mockBooks } from '../../mocks/books';
import '../../pages/BooksPage/BooksPage.css';
import NotFound from '../NotFound/NotFound';

const BooksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredBooks = useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (!trimmedQuery) return mockBooks;
    
    return mockBooks.filter((book) =>
      book.title.toLowerCase().includes(trimmedQuery) ||
      book.author?.toLowerCase().includes(trimmedQuery)
    );
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="page-container"> 
      <h1 className="page-title">Каталог книг</h1>

      <p className="page-subtitle">
        Всего книг: <strong>{mockBooks.length}</strong>
      </p>

      <div className="page-toolbar">
        <BookSearch onSearch={setSearchQuery} />
        {isSearching && (
          <span className="search-result-count">
            Найдено: {filteredBooks.length}
          </span>
        )}
      </div>
      {filteredBooks.length > 0 ? (
        <BookList books={filteredBooks} />
      ) : (
        <NotFound 
          title="Ничего не найдено" 
          subtitle=""
          message={`По запросу "${searchQuery}" не нашлось ни одной книги.`} 
        />
      )}
    </div>
  );
};

export default BooksPage;