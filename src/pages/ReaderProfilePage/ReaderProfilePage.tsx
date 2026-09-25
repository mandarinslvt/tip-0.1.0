import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockReaders } from '../../mocks/readers';
import { mockBooks as initialBooks } from '../../mocks/books'; 
import { BookBlock } from '../../components/readers/ReaderCard/ReaderCard'; 
import ActiveBooksSection from '../../components/readers/ActiveBooks/ActiveBooks';
import type { IBook } from '../../types/book.types';
import type { IReader } from '../../types/reader.types';

const ReaderProfilePage = () => {
  const { id } = useParams<{ id: string }>();

  const [books, setBooks] = useState<IBook[]>(initialBooks);
  const [reader, setReader] = useState<IReader | undefined>(() => 
    mockReaders.find(r => String(r.id) === id)
  );

  if (!reader) {
    return <h2>Читатель не найден</h2>;
  }

  const handleIssueBook = (book: IBook) => {
    setBooks(prevBooks => 
      prevBooks.map(b => b.id === book.id ? { ...b, isAvailable: false } : b)
    );

    setReader(prevReader => {
      if (!prevReader) return prevReader;
      return {
        ...prevReader,
        activeBooks: [...prevReader.activeBooks, book.id],
        booksHistory: [
          ...prevReader.booksHistory,
          { bookId: book.id, takenAt: new Date() }
        ]
      };
    });
  };

  const handleReturnBook = (bookId: string) => {
    setBooks(prevBooks => 
      prevBooks.map(b => b.id === bookId ? { ...b, isAvailable: true } : b)
    );

    setReader(prevReader => {
      if (!prevReader) return prevReader;
      return {
        ...prevReader,
        activeBooks: prevReader.activeBooks.filter(id => id !== bookId),
        booksHistory: prevReader.booksHistory.map(historyItem => 
          historyItem.bookId === bookId && !historyItem.returnedAt 
            ? { ...historyItem, returnedAt: new Date() } 
            : historyItem
        )
      };
    });
  };

  const currentActiveBooks = books.filter(b => reader.activeBooks.includes(b.id));

  return (
    <div className="reader-profile-page" style={{ padding: '20px' }}>
      <h1>Профиль читателя: {reader.fullName}</h1>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
        Email: {reader.email} | Телефон: {reader.phone}
      </p>

      <ActiveBooksSection 
        activeBooks={currentActiveBooks} 
        onReturnBook={handleReturnBook} 
      />

      <BookBlock 
        books={books} 
        onIssueBook={handleIssueBook} 
      />
    </div>
  );
};

export default ReaderProfilePage;
