import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Form = () => {
  const [user, setUser] = useState({ Name: "", Password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(`${apiURL}/usersapi/userlogin`, user).then((res) => {
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify({ role: "user", name: user.Name }));
        localStorage.setItem("isAuthenticated", true); // <<< Add this
        setIsAuthenticated(true);
        navigate("/", { state: { isAuthenticated: true } });
      }
      
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div
      className={`h-screen w-screen ${
        isAuthenticated ? "bg-[#39ae79]" : ""
      } flex justify-center items-center`}
    >
      <div
        className="max-w-[250px] h-[400px] text-center shadow-md rounded-[40px] p-[25px_35px] border-[5px] border-green-50 m-5 bg-green-50
        md:max-w-[350px] md:h-[380px] md:p-[35px_45px] md:m-10
        lg:max-w-[400px] lg:h-[400px] lg:p-[45px_55px] lg:m-12"
      >
        <div className="text-center font-extrabold text-[30px] text-[#158c42]">
          Sign In
        </div>
        <form className="mt-5" onSubmit={submitHandler}>
          <input
            required
            className="w-full bg-white border-none px-5 py-2 rounded-[20px] mt-4 outline-green-400 outline focus:outline-none focus:border-x-2 focus:border-[#0d834c] placeholder:text-gray-400
            md:w-[80%] md:mx-auto"
            type="text"
            name="Name"
            value={user.Name}
            onChange={handleInput}
            placeholder="Name"
          />
          <input
            required
            className="w-full bg-white border-none px-5 py-2 rounded-[20px] mt-4 outline-green-400 outline focus:outline-none focus:border-x-2 focus:border-[#0e7c5b] placeholder:text-gray-400
            md:w-[80%] md:mx-auto"
            type="password"
            name="Password"
            value={user.Password}
            onChange={handleInput}
            placeholder="Password"
          />
          <span className="block mt-2 ml-2 text-xs text-red-500">
            <a href="#">Forgot Password ?</a>
          </span>
          <input
            type="submit"
            value="Sign In"
            className="w-full font-bold bg-green-500 text-white py-2 mt-5 rounded-[20px]  border-none transition-transform duration-200 hover:scale-[1.03] active:scale-95
            md:w-[80%] md:mx-auto"
          />
        </form>
        <div className="flex justify-between mt-2">
          <Link to="/register" className="text-green-500 text-sm ">
            Register now
          </Link>
          <Link to="/adminlogin" className="text-green-500 text-sm ">
            Login as Admin
          </Link>
        </div>
        <span className="block text-center mt-4 text-[9px] text-[#30ca80]">
          <a href="#">Learn user licence agreement</a>
        </span>
      </div>
    </div>
  );
};

export default Form;