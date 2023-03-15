import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import FilterState from "./context/filter/FilterState";
import Product from './components/Product';
import Search from './components/Search';

export default function App() {
  return (
    <>
      <FilterState>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/search" element={<Search />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </FilterState>
    </>
  );
}
