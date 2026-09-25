import React, { useState } from 'react';
import './BookAdd.css';
import { useDispatch } from 'react-redux';

interface BookAddProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookAdd = ({ isOpen, onClose }: BookAddProps) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');

    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const validate = () => {
        const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Название книги обязательно для заполнения';
    }
    if (!author.trim()) {
      newErrors.author = 'Укажите автора книги';
    }
    if (year && (Number(year) < 0 || Number(year) > new Date().getFullYear())) {
      newErrors.year = 'Укажите корректный год издания';
    }

    return newErrors;
};

  const handleClose = () => {
    setTitle('');
    setAuthor('');
    setGenre('');
    setYear('');
    setErrors({});
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Новая книга успешно добавлена в состояние:', {
      title,
      author,
      genre,
      year: Number(year),
    });

    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Добавление новой книги</h2>
          <button className="modal-close" onClick={handleClose}>x</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Название книги *</label>
            <input 
              id="title" 
              name="title" 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="author">Автор *</label>
            <input 
              id="author" 
              name="author" 
              type="text" 
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={errors.author ? 'error' : ''}
            />
            {errors.author && <span className="error-text">{errors.author}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="genre">Жанр</label>
            <input 
              id="genre" 
              name="genre" 
              type="text" 
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Год издания</label>
            <input 
              id="year" 
              name="year" 
              type="number" 
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className={errors.year ? 'error' : ''}
            />
            {errors.year && <span className="error-text">{errors.year}</span>}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={handleClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAdd;