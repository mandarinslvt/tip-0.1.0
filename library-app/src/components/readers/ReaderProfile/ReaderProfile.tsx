import Layout from '../../components/common/Layout/Layout';
import ReaderProfile from '../../components/readers/ReaderProfile/ReaderProfile';
import { mockReaders } from '../../mocks/readers';
import '../../styles/profile.css';
const ReaderProfilePage = () => {
// Для демонстрации берем первого читателя
const reader = mockReaders[0];
return (
<ReaderProfile reader={reader} />
);
};
export default ReaderProfilePage;
