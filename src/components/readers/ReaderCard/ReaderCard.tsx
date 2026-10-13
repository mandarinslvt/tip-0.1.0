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
    <div className="reader-card" style={{ border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '12px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
      <div className="reader-card-avatar" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
      </div>
      <h3 className="reader-name" style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{fullName}</h3>
      
      <div className="reader-info" style={{ fontSize: '14px', color: '#64748b', marginBottom: '1rem' }}>
        <p style={{ margin: '4px 0' }}>{email}</p>
        <p style={{ margin: '4px 0' }}>{phone}</p>
        <p style={{ margin: '8px 0 0 0', color: '#1e88e5', fontWeight: 500 }}>
          Книг на руках: <strong>{activeBooks?.length || 0}</strong>
        </p>
      </div>

      <button 
        className="btn btn-primary" 
        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: '#1e88e5', color: '#fff', fontWeight: 500, cursor: 'pointer' }}
        onClick={handleProfileClick}
      >
        Профиль читателя
      </button>
    </div>
  );
};