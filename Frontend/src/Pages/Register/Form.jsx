import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Form = () => {
  const usersApiUrl = import.meta.env.VITE_USERS_API;

  const navigate = useNavigate();

  const [userData, setuserData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Ref: "",
    Password: "",
  });

  const HandleInput = (e) => {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${usersApiUrl}/signup`, userData)
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      });
  };

  return ( 
      <form
        onSubmit={handleSubmit}
        className="w-full m-5 max-w-sm md:max-w-md lg:max-w-lg bg-white p-6 rounded-3xl shadow-xl space-y-5"
      >
        {/* Title */}
        <div className="text-2xl font-bold text-green-600 text-center">
          Register
        </div>
        <p className="text-sm text-gray-500 text-center">
          Signup now and get full access to our app.
        </p>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            required
            type="text"
            name="Name"
            value={userData.Name}
            onChange={HandleInput}
            placeholder="Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            required
            type="email"
            name="Email"
            value={userData.Email}
            onChange={HandleInput}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            required
            type="tel"
            name="Phone"
            value={userData.Phone}
            onChange={HandleInput}
            placeholder="Phone"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            required
            type="text"
            name="Ref"
            value={userData.Ref}
            onChange={HandleInput}
            placeholder="Referral Code"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            required
            type="password"
            name="Password"
            value={userData.Password}
            onChange={HandleInput}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          Submit
        </button>

        {/* Redirect link */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
  );
};

export default Form;
