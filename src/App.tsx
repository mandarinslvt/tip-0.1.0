import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BooksPage from './pages/BooksPage/BooksPage';
import ReadersPage from './pages/ReadersPage/ReadersPage';
import ReaderProfilePage from './pages/ReaderProfilePage/ReaderProfilePage';
import NavLink from './components/NavLink/NavLink';
import BookDetailPage from './components/books/BookDetail/BookDetailPage';
import NotFound from './pages/NotFound/NotFound';


function App() {
  return (
    <BrowserRouter>
      <NavLink /> 
      
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/readers/:id" element={<ReaderProfilePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/readers" element={<ReadersPage />} />
          <Route path="/readers/:id" element={<ReaderProfilePage />} />
          <Route path="/booksdetail" element={<BookDetailPage />} />
          
          {/* 404 */}
          {/* <Route path="/notfound" element={<NotFound />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;