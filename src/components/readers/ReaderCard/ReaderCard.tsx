import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { IReader } from '../../../types/reader.types';
import './ReaderCard.css'; 

interface ReaderCardProps {
  reader: IReader;
}

export const ReaderCard = ({ reader }: ReaderCardProps) => {
  const navigate = useNavigate();
  const { id, fullName, email, phone, activeBooks } = reader;

  const handleProfileClick = () => {
    navigate(`/readers/${id}`);
  };

  return (
    <div className="reader-card" style={{ border: '1px solid #000000', padding: '1.5rem', borderRadius: '12px', background: '#000000', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
      <div className="reader-card-avatar" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
      </div>
      <h3 className="reader-name">{fullName}</h3>
      
      <div className="reader-info" style={{ fontSize: '14px', color: '#000000', marginBottom: '1rem' }}>
        <p style={{ margin: '4px 0' }}>{email}</p>
        <p style={{ margin: '4px 0' }}>{phone}</p>
        <p style={{ margin: '8px 0 0 0', color: '#1e88e5', fontWeight: 500 }}>
          Книг на руках: <strong>{activeBooks?.length || 0}</strong>
        </p>
      </div>

      <button className="btn-profile" onClick={handleProfileClick}>
        Профиль читателя →
      </button>
    </div>
  );
};