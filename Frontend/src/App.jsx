import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home.jsx";
import Blog from "./Pages/Blog/Blog.jsx";
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
import CardsHomePage from "./Plants/CardsHomePage.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category/:type" element={<CardsHomePage />} />
        <Route path="/product/:details" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/help" element={<Help />} />
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
