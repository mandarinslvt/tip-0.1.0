import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAllReaders } from '../../features/readers/readersSlice';
import { ReaderCard } from '../../components/readers/ReaderCard/ReaderCard';

const ReadersPage = () => {
  const navigate = useNavigate();
  
  // Берем массив читателей из общего Redux-хранилища
  const readers = useSelector(selectAllReaders);

  return (
    <div className="readers-page" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Список читателей</h1>
        {/* Кнопка перехода на форму регистрации */}
        <button 
          onClick={() => navigate('/readers/new')} 
          style={{ padding: '10px 16px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}
        >
          ➕ Зарегистрировать читателя
        </button>
      </div>

      <div className="readers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {readers.map((reader) => (
          <ReaderCard key={reader.id} reader={reader} />
        ))}
      </div>
    </div>
  );
};

export default ReadersPage;
