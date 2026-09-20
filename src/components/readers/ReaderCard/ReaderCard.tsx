import { useNavigate } from 'react-router-dom';
import type { IBook } from '../../../types/book.types';
interface ReaderCardProps {
    book: IBook;
}
const ReaderCard = ({ book }: ReaderCardProps) => {
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

export default ReaderCard;