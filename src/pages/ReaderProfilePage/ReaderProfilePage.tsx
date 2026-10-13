import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockReaders } from '../../mocks/readers';
import { mockBooks as initialBooks } from '../../mocks/books'; 
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
      const updatedReader: any = {
        ...prevReader,
        activeBooks: [...prevReader.activeBooks, book.id],
        booksHistory: [
          ...(prevReader.booksHistory || []),
          { bookId: book.id, takenAt: new Date() }
        ]
      };
      return updatedReader as IReader;
    });
  };

  const handleReturnBook = (bookId: string) => {
    setBooks(prevBooks => 
      prevBooks.map(b => b.id === bookId ? { ...b, isAvailable: true } : b)
    );

    setReader(prevReader => {
      if (!prevReader) return prevReader;
      const updatedReader: any = {
        ...prevReader,
        activeBooks: prevReader.activeBooks.filter(id => String(id) !== String(bookId)),
        booksHistory: (prevReader.booksHistory || []).map(historyItem => 
          String(historyItem.bookId) === String(bookId) && !historyItem.returnedAt 
            ? { ...historyItem, returnedAt: new Date() } 
            : historyItem
        )
      };
      return updatedReader as IReader;
    });
  };

  // Безопасная фильтрация активных книг читателя
  const currentActiveBooks = books.filter(b => 
    reader.activeBooks.map(String).includes(String(b.id))
  );

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
    </div>
  );
};

export default ReaderProfilePage;
