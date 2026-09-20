import type { IBook } from '../../../types/book.types';
import React from 'react';
import { Link } from 'react-router-dom';

interface BookCardProps {
  book: IBook;
  onDetailClick?: (book: IBook) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onDetailClick }) => {
  const { title, author, year, genre, description, isAvailable } = book;
  
  return (
    <article className="book-card">
      <div className="book-cover">
        <div className="book-cover-placeholder">
          <span className="book-cover-emoji">📖</span>
        </div>
        <span className={`book-status-badge badge ${isAvailable ? 'badge-available' : 'badge-unavailable'}`}>
          {isAvailable ? 'Доступна' : 'Выдана'}
        </span>
      </div>

      <div className="book-content">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">{author}</p>
        <div className="book-meta">
          <span className="book-year">{year}</span>
          <span className="book-genre">{genre}</span>
        </div>
        <p className="book-description">{description}</p>
        
        <Link to={`/books/${book.id}`} 
          className="btn btn-primary btn-block"
          onClick={() => onDetailClick?.(book)}>
          Подробнее
        </Link>
      </div>
    </article>
  );
};

export default BookCard;