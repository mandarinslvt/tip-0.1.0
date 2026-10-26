import React, { useState, useMemo, useEffect } from 'react'; // ➕ Добавили useEffect сюда
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllBooks, updateBook } from '../../features/books/booksSlice';
// Оставили один чистый импорт из readersSlice, объединив всё вместе:
import { getReaders, selectAllReaders, selectReadersStatus, updateReader } from '../../features/readers/readersSlice';
import ActiveBooksSection from '../../components/readers/ActiveBooks/ActiveBooks';
import type { IBook } from '../../types/book.types';
import type { IReader } from '../../types/reader.types';

const ReaderProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  
  const status = useSelector(selectReadersStatus);
  const books = useSelector(selectAllBooks);
  const readers = useSelector(selectAllReaders);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getReaders());
    }
  }, [status, dispatch]);

  // Находим текущего читателя в стейте
  const reader = readers.find(r => String(r.id) === String(id));

  // Локальный стейт для строки поиска книги внутри профиля
  const [bookSearchQuery, setBookSearchQuery] = useState('');
  
  if (!reader) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Читатель не найден</h2>
        <button onClick={() => navigate('/readers')} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Вернуться к списку читателей
        </button>
      </div>
    );
  }

  // Логика выдачи книги читателю через Redux
  const handleIssueBook = (book: IBook) => {
    // Обновляем статус книги в Redux
    const updatedBook: IBook = { ...book, isAvailable: false };
    dispatch(updateBook(updatedBook));

    // Обновляем самого читателя (добавляем книгу на руки и запись в историю)
    const updatedReader: IReader = {
      ...reader,
      activeBooks: [...reader.activeBooks, book.id as any],
      booksHistory: [
        ...(reader.booksHistory || []),
        { bookId: book.id as any, takenAt: new Date().toISOString() as any }
      ]
    } as any; // Приведение 'as any' защищает от несовпадений структуры в типах

    dispatch(updateReader(updatedReader));
    setBookSearchQuery(''); // Сбрасываем строку поиска после выдачи
  };

  // Логика возврата книги в библиотеку через Redux
  const handleReturnBook = (bookId: string) => {
    const targetBook = books.find(b => String(b.id) === String(bookId));
    if (targetBook) {
      dispatch(updateBook({ ...targetBook, isAvailable: true }));
    }

    // Удаляем книгу из активных и ставим дату возврата в истории
    const updatedReader: IReader = {
      ...reader,
      activeBooks: reader.activeBooks.filter(aid => String(aid) !== String(bookId)),
      booksHistory: (reader.booksHistory || []).map(historyItem => 
        String(historyItem.bookId) === String(bookId) && !historyItem.returnedAt 
          ? ({ ...historyItem, returnedAt: new Date().toISOString() as any } as any)
          : historyItem
      )
    };
    dispatch(updateReader(updatedReader));
  };

  // Фильтруем список книг, которые сейчас находятся на руках у этого читателя
  const currentActiveBooks = books.filter(b => 
    reader.activeBooks.map(String).includes(String(b.id))
  );

  // Поиск доступных книг прямо на странице читателя
  const availableAndFilteredBooks = useMemo(() => {
    const query = bookSearchQuery.trim().toLowerCase();
    const availableBooks = books.filter(b => b.isAvailable);
    
    if (!query) return availableBooks;
    
    return availableBooks.filter(book => 
      book.title.toLowerCase().includes(query) || 
      book.author?.toLowerCase().includes(query)
    );
  }, [books, bookSearchQuery]);

  return (
    <div className="reader-profile-page" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', padding: '6px 12px', cursor: 'pointer' }}>
        ← Назад
      </button>

      <h1>Профиль читателя: {reader.fullName}</h1>
      <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '16px' }}>
        <strong>Email:</strong> {reader.email} | <strong>Телефон:</strong> {reader.phone}
      </p>

      {/* СЕКЦИЯ 1: Активные книги на руках с возможностью возврата */}
      <ActiveBooksSection 
        activeBooks={currentActiveBooks} 
        onReturnBook={handleReturnBook} 
      />

      {/* СЕКЦИЯ 2: Встроенный блок поиска и выдачи новых книг */}
      <div style={{ marginTop: '2.5rem', padding: '1.5rem', border: '1px dashed #cbd5e1', borderRadius: '12px', background: '#f8fafc' }}>
        <h3>📖 Выдача новой книги</h3>
        
        <input
          type="text"
          placeholder="Поиск доступной книги по названию или автору..."
          value={bookSearchQuery}
          onChange={(e) => setBookSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '1rem', fontSize: '14px' }}
        />

        <div className="available-books-list">
          {availableAndFilteredBooks.length === 0 ? (
            <p style={{ color: '#64748b', fontSize: '14px' }}>Нет доступных книг по вашему запросу</p>
          ) : (
            availableAndFilteredBooks.slice(0, 5).map(book => (
              <div key={book.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                <div>
                  <span style={{ fontWeight: 500 }}>{book.title}</span> 
                  <span style={{ color: '#64748b', fontSize: '14px' }}> — {book.author}</span>
                </div>
                <button
                  onClick={() => handleIssueBook(book)}
                  style={{ padding: '6px 12px', backgroundColor: '#1e88e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
                >
                  Выдать
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReaderProfilePage;
