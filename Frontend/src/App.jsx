import "./index.css";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./User/components/Navbar";
import Footer from "./User/components/Footer";
import Home from "./User/components/Home/Home";
import ListerAuth from "./User/components/Auth/ListerAuth";
import UserAuth from "./User/components/Auth/UserAuth";
import Spots from "./User/components/Spots/Spots";
import Spot from "./User/components/Spot/Product";
import NotFound from "./User/components/NotFound";
import FilterState from "./context/filter/FilterState";
import AdminLayout from "./Admin/layouts/admin";
import AuthLayout from "./Admin/layouts/auth";
import {
  UserAuthContextProvider,
  useUserAuth,
} from "./context/userAuthContext/UserAuthContext";
import Cards from "./User/components/Spots/Cards";
import Checkout from "./User/components/Checkout/Checkout";
import ListerLayout from "./User/components/ListerAdmin/layouts/admin/index.jsx";
import UserManager from "./User/components/UserManager/layouts/admin/index.jsx";
import PostPayment from "./User/components/PostPayment";
import SpotForm from "./User/components/ListSpot/SpotForm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchProvider from "./context/search/searchContextState";
import AdminContextState from "./context/admin/adminContextState";
import EmailConfirmationPage from "./User/components/Auth/EmailConfirmationPage";
import ForgotPasswordPage from "./User/components/Auth/ForgotPassword";
import ResetPassword from "./User/components/Auth/ResetPassword";
import { Navigate } from "react-router-dom";

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

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLogin(true);
    }
  }, [location.pathname]);

  // logging into console scroll height of the page as we scroll

  const handleLogout = async () => {
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
      <AdminContextState>
        <UserAuthContextProvider>
          <SearchProvider>
            <Navbar login={login} logout={handleLogout} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <img
                      src="/comingsoon.jpg"
                      alt="coming soon"
                      style={{
                        width: "100vw",
                        height: "100vh",
                        objectFit: "cover",
                        
                      }}
                    />
                  }
                />
                {/* <Route path="/" element={<Navigate to={'/home'}/>} /> */}
                <Route path="/home" element={<Home />} />
                <Route path="/spot/:spotId" element={<Spot />} />
                <Route path="/cards" element={<Cards />} />
                <Route path="/spots" element={<Spots />} />
                <Route path="/user/auth" element={<UserAuth login={login} />} />
                <Route
                  path="/lister/auth"
                  element={<ListerAuth login={login} />}
                />
                <Route
                  path="user/auth/forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route
                  path="user/auth/reset-password"
                  element={<ResetPassword />}
                />
                <Route
                  path="/verify/email"
                  element={<EmailConfirmationPage />}
                />
                <Route path="auth/*" element={<AuthLayout />} />
                <Route path="admin/*" element={<AdminLayout />} />
                <Route path="/listspot" element={<SpotForm />} />
                <Route path="/checkout/:spotId" element={<Checkout />} />
                <Route path="listeradmin/*" element={<ListerLayout />} />
                <Route path="userprofile/*" element={<UserManager />} />
                <Route path="*" element={<NotFound />} />
                <Route
                  path="/postPayment/:paymentStatus"
                  element={<PostPayment />}
                />
              </Routes>
            </LocalizationProvider>
            <Footer />
          </SearchProvider>
        </UserAuthContextProvider>
      </AdminContextState>
    </>
  );
}
