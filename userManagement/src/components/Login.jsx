import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:5000/api/auth/login", { userId, password })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate(response.data.role === "Admin" ? "/admin" : "/dashboard");
      })
      .catch(() => alert("Invalid credentials"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-80">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Login
        </h2>
        <input
          type="text"
          placeholder="UserID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border border-gray-300 p-3 mb-5 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-3 mb-5 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded w-full hover:from-blue-600 hover:to-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
