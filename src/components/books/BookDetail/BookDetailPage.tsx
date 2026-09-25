import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BookDetailInfo from '../../../components/books/BookDetail/BookDetail';
import { selectBookById } from '../../../store/bookData';
import './BookDetail.css';

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const book = useSelector((state: any) => selectBookById(state, id || ''));

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
