import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">📚</span>
            <span>Библиотека</span>
          </div>
          <nav className="nav">
            <NavLink 
              to="/books" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Книги
            </NavLink>
            <NavLink 
              to="/readers" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Читатели
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
