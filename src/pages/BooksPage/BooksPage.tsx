import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAllBooks } from '../../features/books/booksSlice';
import BookList from '../../components/books/BookList/BookList';
import BookSearch from '../../components/books/BookSearch/BookSearch'; 
import { useNavigate } from 'react-router-dom';

const BooksPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Читаем книги из общего Redux-хранилища (там уже лежат mockBooks)
  const books = useSelector(selectAllBooks);

  const filteredBooks = useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (!trimmedQuery) return books;
    
    return books.filter((book) =>
      book.title.toLowerCase().includes(trimmedQuery) ||
      book.author?.toLowerCase().includes(trimmedQuery)
    );
  }, [books, searchQuery]);

  return (
    <div className="page-container" style={{ padding: '20px' }}> 
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="page-title">Каталог книг</h1>
        {/* Кнопка перехода на форму добавления */}
        <button 
          onClick={() => navigate('/books/new')} 
          style={{ padding: '10px 16px', backgroundColor: '#1e88e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}
        >
          ➕ Добавить книгу
        </button>
      </div>
      
      <p className="page-subtitle">Всего книг: <strong>{books.length}</strong></p>

      <div className="page-toolbar">
        <BookSearch onSearch={setSearchQuery} />
      </div>

      <BookList books={filteredBooks} />
    </div>
  );
};

export default BooksPage;