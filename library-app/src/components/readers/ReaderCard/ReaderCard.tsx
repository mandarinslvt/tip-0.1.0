import type { IBook } from '../../types/reader.types';
interface ReaderCardProps {
    book: IBook;
}
const ReaderCard = ({ book }: ReaderCardProps) => {
    const { title, author, year, genre, isAvailable, description } = book;
    сonst statusClass = isAvailable ? 'badge-available' : 'badge-unavailable';
    const statusText = isAvailable ? 'Доступна' : 'Выдана';
    
    return (
        ...
    );
};

export default ReaderCard;