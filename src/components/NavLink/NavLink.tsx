import { NavLink } from 'react-router-dom';
import './NavLink.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">📚 Библиотека</div>
      <div className="navbar-links">
        <NavLink 
          to="/books" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Книги
        </NavLink>
        <NavLink 
          to="/readers" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Читатели
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
