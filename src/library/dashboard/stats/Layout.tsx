import { Routes, Route } from 'react-router-dom';
import Layout from './../../../components/common/Layout/Layout';
import BooksPage from './../../../pages/BooksPage/BooksPage';
import ReadersPage from './../../../pages/ReadersPage/ReadersPage';
import ReaderProfilePage from './../../../pages/ReaderProfilePage/ReaderProfilePage';

function App() {
    return (
        <Routes>
            {/* Layout используется один раз */}
            <Route path="/" element={<Layout />}>
              <Route index element={<BooksPage />} />
              <Route path="books" element={<BooksPage />} />
              <Route path="readers" element={<ReadersPage />} />
              <Route path="reader/:id" element={<ReaderProfilePage />} />
            </Route>
        </Routes>
    );
}