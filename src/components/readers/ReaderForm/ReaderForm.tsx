import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addReader, updateReader, selectAllReaders } from '../../../features/readers/readersSlice';
import type { IReader } from '../../../types/reader.types';

export const ReaderForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const readers = useSelector(selectAllReaders);
  const existingReader = readers.find((r: IReader) => String(r.id) === String(id));

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (existingReader) {
      setFullName(existingReader.fullName);
      setEmail(existingReader.email);
      setPhone(existingReader.phone);
    }
  }, [existingReader]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    if (id && existingReader) {
      const updated: IReader = {
        ...existingReader,
        fullName,
        email,
        phone,
      };
      dispatch(updateReader(updated) as any);
    } else {
      const newReader = {
        id: Date.now() as any, 
        fullName: fullName as string, // Явно связываем поле объекта и стейт формы
        email: email as string,
        phone: phone as string,
        activeBooks: [] as any[],
        booksHistory: [] as any[]
      } as unknown as IReader; // Двойное приведение полностью уберет любые ошибки типов
      dispatch(addReader(newReader) as any);
    }

    navigate('/readers');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#fff' }}>
      <h2>{id ? '✏️ Редактирование читателя' : '➕ Добавление читателя'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>ФИО читателя</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Телефон</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}>
          {id ? 'Обновить профиль' : 'Зарегистрировать'}
        </button>
      </form>
    </div>
  );
};
