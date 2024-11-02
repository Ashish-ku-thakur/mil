import { Outlet } from "react-router-dom";
import Navbar from "./comp/Navbar";
import Footer from "./comp/Footer";

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>
      
      <section className="flex-1">
        <Outlet />
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainPage;
