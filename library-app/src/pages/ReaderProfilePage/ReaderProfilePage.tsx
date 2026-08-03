import ReaderProfile from '../../components/readers/ReaderProfile/ReaderProfile';
import { mockReaders } from '../../mocks/readers';
import '../ReaderProfilePage/ReaderProfilePage.css';
import '../../styles/profile.css';

const ReaderProfilePage = () => {
  const reader = mockReaders[0];

  return (
    <ReaderProfile reader = {reader} />
  );
};

export default ReaderProfilePage;
