import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminSignForm = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({ AdminName: "", Password: "" });

  const adminsApiUrl = import.meta.env.VITE_ADMINS_API;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const loginPromise = axios.post(`${adminsApiUrl}/login`, adminData);

    toast.promise(
      loginPromise,
      {
        pending: "Logging in as admin...",
        success: "Admin login successful!",
        error: "Login failed. Please check credentials.",
      },
      { position: "top-right" }
    );

    try {
      const res = await loginPromise;
      const { token, data } = res.data;

      localStorage.setItem(
        "auth",
        JSON.stringify({ type: "admin", name: data.AdminName })
      );
      localStorage.setItem("isAuthenticated", "true");
      navigate("/admindashboard", { replace: true });
    } catch (err) {
      console.error("Admin login failed:", err);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-green-100">
      <ToastContainer />
      <div className="w-full max-w-sm p-6 rounded-3xl bg-white shadow-xl animate-fadeIn">
        <h2 className="text-2xl font-bold text-green-600 text-center mb-6">
          Admin Login
        </h2>
        <form className="space-y-5" onSubmit={SubmitHandler}>
          <input
            required
            type="text"
            name="AdminName"
            value={adminData.AdminName}
            onChange={handleChange}
            placeholder="Admin Name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            required
            type="password"
            name="Password"
            value={adminData.Password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Sign In
          </button>
        </form>
        <p className="text-[10px] text-center mt-5 text-green-400">
          <a href="#">Learn admin access policy</a>
        </p>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-green-600 underline hover:text-green-800 transition"
          >
            Login as User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSignForm;
