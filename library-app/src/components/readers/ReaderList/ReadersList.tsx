import type { IBook } from '../../../types/reader.types';
import ReaderList from '../../../pages/ReaderProfilePage/ReaderProfilePage';
interface ReaderListProps {
    readers: IBook[];
}
const BookList = ({ books }: BookListProps) => {
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
        ...)
        ;
    };
    
export default BookList;
