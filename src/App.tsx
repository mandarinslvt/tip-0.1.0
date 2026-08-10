import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BooksPage from './pages/BooksPage/BooksPage';
import ReadersPage from './pages/ReadersPage/ReadersPage';
import ReaderProfilePage from './pages/ReaderProfilePage/ReaderProfilePage';
import NavLink from './components/NavLink/NavLink';

function App() {
  return (
    <BrowserRouter>
    {/* маршрут */}
      <NavLink /> 
      
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/readers/:id" element={<ReaderProfilePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/readers" element={<ReadersPage />} />
          <Route path="/readers/:id" element={<ReaderProfilePage />} />
          
          {/* 404 */}
          <Route path="*" element={<h2>Страница не найдена</h2>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;