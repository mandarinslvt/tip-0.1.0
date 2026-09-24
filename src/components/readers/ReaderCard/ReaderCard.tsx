import React, { useState, useMemo } from 'react';
import type { IBook } from '../../../types/book.types';

interface ReaderCardProps {
    book: IBook;
}

// 1. ИСПРАВЛЕНО: Добавлен явный именованный экспорт для ReaderCard
export const ReaderCard = ({ book }: ReaderCardProps) => {
    const { title, author, year, genre, isAvailable, description } = book;
    const statusClass = isAvailable ? 'badge-available' : 'badge-unavailable';
    const statusText = isAvailable ? 'Доступна' : 'Выдана';
    
    return (
        <div className="reader-book-card">
            <h4>{title}</h4>
            <p>{author}</p>
            <span className={`badge ${statusClass}`}>{statusText}</span>
        </div>
    );
};

interface BookProps {
  books: IBook[];
  onIssueBook: (book: IBook) => void;
}

// 2. ИСПРАВЛЕНО: Добавлен явный именованный экспорт для BookBlock
export const BookBlock = ({ books, onIssueBook }: BookProps) => {
  const [query, setQuery] = useState('');
  
  const foundBooks = useMemo(() => {
    if (!query.trim()) return [];
    
    return books.filter(book => 
      book.isAvailable && 
      book.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [books, query]);

  return (
    <div className="book-block" style={{ border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '12px', marginTop: '1.5rem' }}>
      <h3>📚 Выдача книг</h3>
      <div className="form-group" style={{ marginTop: '1rem' }}>
        <input
          type="text"
          placeholder="Поиск книги по названием..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
      </div>

      {query.trim() && (
        <div className="search-results" style={{ marginTop: '1rem' }}>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Найдено вариантов: {foundBooks.length}</p>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem' }}>
            {foundBooks.map(book => (
              <li key={book.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span><strong>"{book.title}"</strong> — {book.author}</span>
                <button 
                  className="btn btn-primary" 
                  style={{ padding: '4px 12px', fontSize: '13px' }}
                  onClick={() => {
                    onIssueBook(book);
                    setQuery(''); 
                  }}
                >
                  Выдать
                </button>
              </li>
            ))}
          </ul>
          {foundBooks.length === 0 && (
            <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic' }}>Нет доступных книг с таким названием</p>
          )}
        </div>
      )}
    </div>
  );
};
