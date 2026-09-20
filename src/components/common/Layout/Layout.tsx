// components/common/Layout/Layout.tsx
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
const Layout = () => {
    return (
      <div className="page-wrapper">
        <Header />
        <main className="main-content">
            <div className="container">
                <Outlet /> {/* ← Сюда подставляются дочерние маршруты */}
            </div>
        </main>
        <Footer />
      </div>
    );
};
export default Layout;