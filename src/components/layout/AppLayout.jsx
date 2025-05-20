import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const AppLayout = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;