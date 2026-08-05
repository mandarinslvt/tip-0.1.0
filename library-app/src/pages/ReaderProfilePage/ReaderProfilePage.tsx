import ReaderProfileWrapper from '../../components/readers/ReaderProfile/ReaderProfileWrapper';
import { mockReaders } from '../../mocks/readers';
import type { IReader } from '../../types/reader.types';
import '../ReaderProfilePage/ReaderProfilePage.css';
import '../../styles/profile.css';

interface ReaderProfilePageProps {
  reader: IReader;
}

const ReaderProfilePage = ({reader}: ReaderProfilePageProps) => {
  return (
    <div className="profile">
      <h1> Profile: {reader?.fullName}</h1>
      <p>Email: {reader?.email}</p>
      <p>Телефон: {reader?.phone}</p>
    </div>
  );
};

export default ReaderProfilePage;
