import type { IBook } from '../../types/books';

interface BookDetailInfoProps {
  book: IBook;
}

const BookDetailInfo = ({ book }: BookDetailInfoProps) => {
  return (
    <div className="book-detail-info">
      <div className="book-meta-extended">
        <p><strong>Жанр:</strong> {book.genre}</p>
        <p><strong>Год издания:</strong> {book.year} г.</p>
        <p><strong>Издательство:</strong> {book.publisher || 'Не указано'}</p>
        <p><strong>Количество страниц:</strong> {book.pages || '—'}</p>
      </div>
      <div className="book-detail-description">
        <h4>О книге</h4>
        <p>{book.description}</p>
      </div>
    </div>
  );
};

export default BookDetailInfo;