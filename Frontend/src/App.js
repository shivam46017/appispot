import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Home from "./components/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Signup from "./components/Signup";
import FilterState from "./context/filter/FilterState";
import Product from './components/Product';
import Search from './components/Search';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function App() {

  const [progress, setProgress] = useState(0)
  const [login, setLogin] = useState(false)
  const location = useLocation()
  console.log(location)

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setLogin(true)
      // setKey(Math.random())
    }

  }, [location.pathname])


  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("You are successfully logout", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setLogin(false)
  }
  
  return (
    <>
      <FilterState>
        <Navbar login={login} logout={handleLogout}/>
        {/* <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waitingTime={400}
        height={3}
      /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/search" element={<Search />} />
          <Route path="/user/login" element={<Login login={login}/>} />
          <Route path="/user/signup" element={<Signup login={login} />} />
        </Routes>
        <Footer />
      </FilterState>
    </>
  );
}
