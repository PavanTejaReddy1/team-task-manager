import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../api/axios";

function CreateProject() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        members: [],
    });

    const fetchUsers = async () => {

        try {

            const response = await API.get(
                "/users/all"
            );

            setUsers(response.data.users);

        } catch (error) {

            toast.error("Failed to fetch users");

        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleMembersChange = (e) => {

        const selectedMembers = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );

        setFormData({
            ...formData,
            members: selectedMembers,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/projects/create",
                formData
            );

            toast.success(response.data.message);

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to create project"
            );

        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8">
                <h2 className="text-3xl font-bold text-center mb-6">Create Project</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-2 font-medium">Project Title</label>
                        <input type="text" name="title" placeholder="Enter project title" value={formData.title} onChange={handleChange} className="w-full border p-3 rounded-lg outline-none" required />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Description</label>
                        <textarea name="description" placeholder="Enter project description" value={formData.description} onChange={handleChange} rows="4" className="w-full border p-3 rounded-lg outline-none" required />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Select Members</label>
                        <select multiple onChange={handleMembersChange} className="w-full border p-3 rounded-lg outline-none h-40">
                            {users.map((user) => (
                                <option key={user._id} value={user._id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold cursor-pointer">Create Project</button>
                </form>
            </div>
        </div>
    );
}

export default CreateProject;