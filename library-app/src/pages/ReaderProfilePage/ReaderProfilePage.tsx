import Layout from '../../components/common/Layout/Layout.tsx';
import ReaderProfile from '../../components/readers/ReaderProfile/ReaderProfile.tsx'
import { mockReaders } from '../../mocks/readers';
import '../../styles/profile.css';

const ReaderProfilePage = () => {
    const reader = mockReaders[0];
    return (
    <ReaderProfile reader={reader} />
);
};
export default ReaderProfilePage;