import React from 'react';
import type { IBook } from '../../../types/book.types';

interface ActiveBooksSectionProps {
  activeBooks: IBook[];
  onReturnBook: (bookId: string) => void;
}

const ActiveBooksSection = ({ activeBooks, onReturnBook }: ActiveBooksSectionProps) => {
  const handleReturnClick = (bookId: string, title: string) => {
    const isConfirmed = window.confirm(`Вы уверены, что хотите принять возврат книги "${title}"?`);
    if (isConfirmed) {
      onReturnBook(bookId);
    }
  };

  return (
    <div className="active-books-section" style={{ marginTop: '1.5rem' }}>
      <h3>📖 Книги на руках</h3>
      {activeBooks.length === 0 ? (
        <p style={{ color: '#94a3b8', fontStyle: 'italic', marginTop: '0.5rem' }}>У читателя нет активных книг.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
          {activeBooks.map(book => (
            <li key={book.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '8px', marginBottom: '8px' }}>
              <div>
                <strong>"{book.title}"</strong> — {book.author}
                <br />
                <span style={{ fontSize: '12px', color: '#64748b' }}>Жанр: {book.genre}</span>
              </div>
              <button 
                className="btn" 
                style={{ backgroundColor: '#ef4444', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                onClick={() => handleReturnClick(book.id, book.title)}
              >
                Вернуть
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActiveBooksSection;
