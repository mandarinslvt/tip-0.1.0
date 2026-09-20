const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>© {currentYear} Библиотека. Все права защищены.</div>
          <div className="footer-contacts">
            <span> (номер)</span>
            <span>(library@mail.ru)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
