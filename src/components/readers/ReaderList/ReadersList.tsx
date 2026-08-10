import type { IBook } from '../../../types/book.types';
import ReaderCard from '../../readers/ReaderCard/ReaderCard';

interface ReadersListProps {
    books: IBook[]; // Передаем массив книг, закрепленных за читателем
}

const ReaderBookList = ({ books = [] }: ReadersListProps) => {
    if (books.length === 0) {
        return (
        <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>Книги не найдены</h3>
            <p>Попробуйте изменить параметры поиска</p>
        </div>
        );
    }
    return (
        <div className="reader-book-list">
            {books.map((book) => (
                <ReaderCard key={book.id} book={book}/>
            ))};

        </div>
    );
};
    
export default ReaderBookList;
