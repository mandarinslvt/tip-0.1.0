import ReaderProfilePage from '../../../pages/ReaderProfilePage/ReaderProfilePage';
import { mockReaders } from '../../../mocks/readers';
import '../../../styles/profile.css';

// Создаем компонент с ДРУГИМ именем (например, ProfileContainer или App)
const ProfileWrapper = () => {
  return (
    <ReaderProfilePage />
  );
};

export default ProfileWrapper;
