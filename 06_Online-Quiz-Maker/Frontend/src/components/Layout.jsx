import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop.jsx";
import ScrollTopButton from "./ScrollTopButton.jsx";

export default function Layout() {
  return (
    <>
      <Navbar />
      <ScrollToTop /> 
      <main className="min-h-screen px-4 py-6">
        <Outlet />
      </main>
      <Footer/>
      <ScrollTopButton />
    </>
  );
}
