import { useParams } from 'react-router-dom';
// import ReaderProfileWrapper from '../../components/readers/ReaderProfile/ReaderProfileWrapper';
import { mockReaders } from '../../mocks/readers';
import type { IReader } from '../../types/reader.types';
import '../ReaderProfilePage/ReaderProfilePage.css';
import '../../styles/profile.css';

interface ReaderProfilePageProps {
  reader?: IReader;
}

const ReaderProfilePage = ({ reader: propReader }: ReaderProfilePageProps) => {
  const { id } = useParams<{ id: string }>();

  // Если пропс передан (как в ProfileWrapper) — берем его. 
  // Если нет — ищем в моках по id из URL строки браузера.
  const reader = propReader || mockReaders.find((r) => String(r.id) === id);

  if (!reader) {
    return (
      <div className="profile">
        <h1>Пользователь не найден</h1>
        <p>Убедитесь, что ID указан верно.</p>
      </div>
    );
  }

  return (
    <div className="profile">
      <h1>Profile: {reader.fullName}</h1>
      <p>Email: {reader.email}</p>
      <p>Телефон: {reader.phone}</p>
    </div>
  );
};

export default ReaderProfilePage;
