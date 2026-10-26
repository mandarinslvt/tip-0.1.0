import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BooksPage from './pages/BooksPage/BooksPage';
import ReadersPage from './pages/ReadersPage/ReadersPage';
import ReaderProfilePage from './pages/ReaderProfilePage/ReaderProfilePage';
import NavLink from './components/NavLink/NavLink';
import BookDetailPage from './components/books/BookDetail/BookDetailPage';
import NotFound from './pages/NotFound/NotFound';

// ➕ ДОБАВЛЯЕМ ПРОПУЩЕННЫЕ ИМПОРТЫ (проверьте пути к файлам в вашем проекте!):
import { BookForm } from './components/books/BookForm/BookForm';
import { ReaderForm } from './components/readers/ReaderForm/ReaderForm';

function App() {
  return (
    <BrowserRouter>
      <NavLink /> 
      
      <main className="container">
        <Routes>
          {/* Главная страница сразу перенаправляет на книги */}
          <Route path="/" element={<Navigate to="/books" replace />} />
          
          {/* Книги */}
          <Route path="/books" element={<BooksPage />} />
          {/* Исправили /booksdetail на /books/:id, чтобы открывалась конкретная книга по ID */}
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/edit/:id" element={<BookForm />} />

          {/* Читатели */}
          <Route path="/readers" element={<ReadersPage />} />
          <Route path="/readers/:id" element={<ReaderProfilePage />} />
          <Route path="/readers/new" element={<ReaderForm />} />
          <Route path="/readers/edit/:id" element={<ReaderForm />} />

          {/* 404 Страница не найдена */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
