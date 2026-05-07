import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../api/axios";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/signup",
        formData
      );

      toast.success(response.data.message);

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>

        <form onSubmit={handleSubmit} className="space-y-4" >
          <input type="text" name="name"  placeholder="Enter name" value={formData.name} onChange={handleChange} className="w-full border p-3 rounded-lg outline-none" required/>
          <input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} className="w-full border p-3 rounded-lg outline-none" required />
          <input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} className="w-full border p-3 rounded-lg outline-none" required />

          <select name="role" value={formData.role} onChange={handleChange} className="w-full border p-3 rounded-lg outline-none">
            <option value="member">
              Member
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold cursor-pointer">Signup</button>
        </form>
        <p className="text-center mt-4"> Already have an account? <Link to="/login" className="text-blue-600 ml-2">Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;