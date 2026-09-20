import { useState } from 'react';
import { mockReaders } from '../../mocks/readers';
import ReaderCard from '../../components/readers/ReaderCard/ReaderCard';
import './ReadersPage.css';

const ReadersPage = () => {
  const [readers] = useState(mockReaders);

  return (
    <div className="readers-page">
      <h1 className="page-title">Читатели библиотеки</h1>
      <p className="page-subtitle">
        Всего зарегистрировано: <strong>{readers.length}</strong>
      </p>

      {/* Сетка для карточек читателей */}
      <div className="readers-grid">
        {readers.map((reader) => (
          <ReaderCard key={reader.id} reader={reader} />
        ))}
      </div>

      {readers.length === 0 && (
        <p className="no-results">В базе данных пока нет читателей.</p>
      )}
    </div>
  );
};

export default ReadersPage;
