import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../api/axios";

function CreateTask() {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        project: "",
        assignedTo: "",
        dueDate: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const fetchProjects = async () => {

        try {

            const response = await API.get(
                "/projects/all"
            );

            setProjects(response.data.projects);

        } catch (error) {

            toast.error("Failed to fetch projects");

        }
    };

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

        fetchProjects();
        fetchUsers();

    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/tasks/create",
                formData
            );

            toast.success(response.data.message);

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to create task"
            );

        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Create Task</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-2 font-medium">Task Title</label>
                        <input type="text" name="title" placeholder="Enter task title" value={formData.title} onChange={handleChange} className="w-full border p-3 rounded-lg outline-none" required />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Description</label>
                        <textarea name="description" placeholder="Enter task description" value={formData.description} onChange={handleChange} rows="4" className="w-full border p-3 rounded-lg outline-none" required />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Select Project</label>
                        <select name="project" value={formData.project} onChange={handleChange} className="w-full border p-3 rounded-lg outline-none" required>
                            <option value="">Choose Project</option>
                            {projects.map((project) => (
                                <option key={project._id} value={project._id}>{project.title}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Assign To</label>
                        <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} className="w-full border p-3 rounded-lg outline-none" required>
                            <option value="">Select User</option>
                            {users.map((user) => (
                                <option key={user._id} value={user._id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Due Date</label>
                        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="w-full border p-3 rounded-lg outline-none" required />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold cursor-pointer">Create Task</button>
                </form>
            </div>
        </div>
    );
}

export default CreateTask;