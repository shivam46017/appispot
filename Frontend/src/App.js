import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./User/components/Navbar";
import Footer from "./User/components/Footer";
import Home from "./User/components/Home/Home";
import ListerAuth from "./User/components/Auth/ListerAuth";
import UserAuth from "./User/components/Auth/UserAuth";
import Spots from './User/components/Spots/Spots';
import Spot from './User/components/Spot/Product';
import NotFound from './User/components/NotFound';
import FilterState from "./context/filter/FilterState";
import AdminLayout from "./Admin/layouts/admin";
import AuthLayout from "./Admin/layouts/auth";
import { UserAuthContextProvider, useUserAuth } from "./context/FirebaseAuth/UserAuthContext";
import Cards from "./User/components/Spots/Cards";
import ListSpot from "./User/components/ListSpot/ListSpot";
import Checkout from "./User/components/Checkout/Checkout";




export default function App() {
  const [progress, setProgress] = useState(0);
  const [login, setLogin] = useState(false);
  const location = useLocation();
  // const { logOut } = useUserAuth();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLogin(true);
      // setKey(Math.random())
    }
  }, [location.pathname]);

  const navigate= useNavigate()


  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLogin(true);
    }
  }, [location.pathname]);



  


  const handleLogout =async () => {
    // await logOut()
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
    setLogin(false);
  };

  return (
    <>
    <UserAuthContextProvider>
        <Navbar login={login} logout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spot" element={<Spot />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/spots" element={<Spots />} />
          <Route path="/user/auth" element={<UserAuth login={login} />} />
          <Route path="/lister/auth" element={<ListerAuth login={login} />} />
          <Route path="auth/*" element={<AuthLayout />} />
          <Route path="admin/*" element={<AdminLayout />} />
          <Route path="/listspot" element={<ListSpot />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        </UserAuthContextProvider>
    </>
  );
}
