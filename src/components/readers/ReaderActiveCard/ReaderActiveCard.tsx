import type { IReader } from '../../../types/reader.types';

interface ReaderCardProps {
  reader: IReader;
}

const ReaderActiveCard = ({ reader }: ReaderCardProps) => {
  const { fullName, email, phone, activeBooks } = reader;
  
  // Вычисляем статус читателя динамически (вместо хранения в интерфейсе)
  const hasActiveBooks = activeBooks.length > 0;
  const statusClass = hasActiveBooks ? 'badge-unavailable' : 'badge-available';
  const statusText = hasActiveBooks ? `Книг на руках: ${activeBooks.length}` : 'Нет книг на руках';

  return (
    <div className="reader-card">
      <div className="reader-card-header">
        <h3 className="reader-name">{fullName}</h3>
        <span className={`badge ${statusClass}`}>{statusText}</span>
      </div>
      <div className="reader-card-body">
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Телефон:</strong> {phone}</p>
      </div>
    </div>
  );
};

export default ReaderActiveCard;
