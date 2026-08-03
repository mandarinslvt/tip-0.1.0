// import Layout from '../../components/common/Layout/Layout.tsx/index.ts';
import BookList from '../../components/books/BookList/BookList';
import BookSearch from '../../components/books/BookSearch/BookSearch.tsx';
import { mockBooks } from '../../mocks/books';
import { useState } from 'react';
import '../BooksPage/BooksPage.css';

const BooksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <h1 className="page-title">Каталог книг</h1>
      {
        
      };

      <p className="page-subtitle">
        Всего книг: <strong>{mockBooks.length}</strong>
      </p>
      <div className = "page-toolbar">
        <BookSearch onSearch={setSearchQuery} />
        {searchQuery && (
          <span className = "search-result-count">
            Найдено: {filteredBooks.length}
              </span>
            )}
            </div>
            <BookList books={filteredBooks} />
            </>
            )
          };
export default BooksPage;