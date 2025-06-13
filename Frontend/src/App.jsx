import React from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Component/Home.jsx";
import ProductDetails from "./Pages/ProductDetails/ProductDetails.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import Checkout from "./Pages/Checkout/Checkout.jsx";
import Help from "./Pages/Help/Help.jsx";
import AdminLogin from "./Pages/Admin/AdminLogin.jsx";
import Navbar from "./Component/Layout/Navbar/Navbar.jsx";
import Footer from "./Component/Layout/Footer/Footer.jsx";
import UserProtectedRoute from "./Utils/UserProtectedRoute.jsx";
import AdminProtectedRoute from "./Utils/AdminPortectedRoute.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import CardsHomePage from "./Products/CardsHomePage.jsx";
import ScrollToTop from "./Utils/ScrollToTop.jsx";
import { useAddress } from './Context/AddressContext.jsx';
import AddressModal from './Pages/Address/AddressModal.jsx';
import WhatsappButton from './Component/WhatsappButton.jsx';
import RedirectIfLoggedIn from './Utils/RedirectIfLoggedIn.jsx';
import NotFound from './Pages/NotFound.jsx';
import AboutUs from './Pages/AboutUs.jsx';
// import AddressManager from './Pages/Address/AddressManager.jsx';

function App() {
  const { showAddressModal } = useAddress();
  return (
    <>
      <ScrollToTop />
      {showAddressModal && (
        <AddressModal />
      )}
      <Navbar />
      {/* <AddressManager/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Admin and User */}
        <Route
          path="/register"
          element={
            <RedirectIfLoggedIn>
              <Register />
            </RedirectIfLoggedIn>
          }
        />

        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn>
              <Login />
            </RedirectIfLoggedIn>
          }
        />

        <Route
          path="/adminlogin"
          element={
            <RedirectIfLoggedIn>
              <AdminLogin />
            </RedirectIfLoggedIn>
          }
        />

        <Route path="/admindashboard" element={<AdminDashboard />} />


        <Route path="/help" element={<Help />} />
        <Route path="/aboutus" element={<AboutUs />} />

        {/* Products */}
        <Route path="/:productType/category/:category" element={<CardsHomePage />} />
        <Route path="/:productType" element={<CardsHomePage />} />
        <Route path="/:productType/:id" element={<ProductDetails />} />
        <Route
          path="/cart"
          element={
            <UserProtectedRoute>
              <Cart />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <UserProtectedRoute>
              <Checkout />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <WhatsappButton />
    </>
  );
}

export default App;
