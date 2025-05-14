import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminSignForm = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = React.useState({
    AdminName: "",
    Password: "",
  });
  const [error, setError] = React.useState(null);
  const [isRegistered, setIsRegistered] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/adminsapi/adminlogin", adminData);
      localStorage.setItem(
        "admin",
        JSON.stringify({
          role: "admin",
          name: res.data.adminData.AdminName,
          token: res.data.token,
        })
      );

      alert("Admin Logged In");
      setIsRegistered(true);
      navigate("/admindashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${
        isRegistered ? "" : ""
      }`}
    >
      <form
        className="bg-green-50 p-4 max-w-sm w-full rounded-lg shadow-md md:max-w-md lg:max-w-lg"
        onSubmit={SubmitHandler}
      >
        <p className="text-xl font-semibold text-center text-green-800 mb-4">
          Admin Login
        </p>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Enter email"
            name="AdminName"
            value={adminData.AdminName}
            onChange={handleChange}
            className="bg-white p-4 pr-12 text-sm w-full border border-gray-300 rounded-lg shadow-sm outline-none"
          />
        </div>

        <div className="relative mb-4">
          <input
            type="password"
            placeholder="Enter password"
            name="Password"
            value={adminData.Password}
            onChange={handleChange}
            className="bg-white p-4 pr-12 text-sm w-full border border-gray-300 rounded-lg shadow-sm outline-none"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="block w-full py-3 px-5 bg-green-800 text-white text-sm font-medium rounded-lg uppercase"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default AdminSignForm;