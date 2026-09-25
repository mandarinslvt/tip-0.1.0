import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllReaders, selectReadersStatus, getReaders } from './readersSlice';
import type { RootState } from '../../app/store';

export const ReadersList: React.FC = () => {
  const dispatch = useDispatch<any>(); 
  const readers = useSelector(selectAllReaders);
  const status = useSelector(selectReadersStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getReaders()); 
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div>Загрузка...</div>;
  if (status === 'failed') return <div> Ошибка</div>;

  return (
    <div>
      <h2>Читатели ({readers.length})</h2>
      <div className="readers-grid">
        {readers.map((reader: any) => (
          <div key={reader.id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
            <strong>{reader.fullName}</strong> — {reader.email}
          </div>
        ))}
      </div>
    </div>
  );
};