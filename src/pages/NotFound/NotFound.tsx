import { Link } from 'react-router-dom';

// Добавляем описание типов для пропсов (TypeScript)
interface NotFoundProps {
  title?: string;
  subtitle?: string;
  message?: string;
}

// Задаем значения по умолчанию прямо в параметрах функции
const NotFound = ({ 
  title = "404", 
  subtitle = "Страница не найдена", 
  message = "Извините, запрошенная страница не существует." 
}: NotFoundProps) => {
  return (
    <div className="not-found" style={{ textAlign: 'center', padding: '3rem' }}>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
      <p>{message}</p>
      <Link to="/books" className="btn btn-primary">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound;

