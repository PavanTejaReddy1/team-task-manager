import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../api/axios";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            toast.success(response.data.message);

            navigate("/dashboard");

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Login failed"
            );

        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} className="w-full border p-3 rounded-lg outline-none" required />
                    <input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} className="w-full border p-3 rounded-lg outline-none" required />
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold cursor-pointer">Login</button>
                </form>

                <p className="text-center mt-4">Don't have an account?<Link to="/signup" className="text-blue-600 ml-2">Signup</Link></p>
            </div>
        </div>
    );
}

export default Login;