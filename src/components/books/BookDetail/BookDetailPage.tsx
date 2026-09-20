import { useParams, useNavigate } from 'react-router-dom';
import BookDetailInfo from '../../../components/books/BookDetail/BookDetail';
import { mockBooks } from '../../../mocks/books';
import './BookDetail.css';

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const book = mockBooks.find((b) => String(b.id) === id);

  if (!book) {
    return (
      <div className="book-not-found">
        <h2>Книга не найдена</h2>
        <p>Книги с идентификатором {id} не существует в нашей базе данных.</p>
        <button onClick={() => navigate('/books')} className="btn btn-primary">
          Вернуться к каталогу
        </button>
      </div>
    );
  }

  return (
    <div className="book-detail-page">
      <div className="page-header-actions">
        <button onClick={() => navigate(-1)} className="btn-back">
          ← Назад
        </button>
        <h1 className="page-title">{book.title}</h1>
        <p className="page-author">Автор: {book.author}</p>
      </div>

      <div className="book-detail-layout">
        <BookDetailInfo book={book} />
      </div>
    </div>
  );
};

export default BookDetailPage;
