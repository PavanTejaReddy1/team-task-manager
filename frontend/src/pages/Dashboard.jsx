import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import API from "../api/axios";

function Dashboard() {

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const user = JSON.parse(localStorage.getItem("user"));

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || task.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const fetchTasks = async () => {
        try {
            const response = await API.get("/tasks/all");
            setTasks(response.data.tasks);
        } catch (error) {
            toast.error("Failed to fetch tasks");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(
        (task) => task.status === "pending"
    ).length;

    const completedTasks = tasks.filter(
        (task) => task.status === "completed"
    ).length;

    const overdueTasks = tasks.filter((task) => {
        return (
            task.status !== "completed" &&
            new Date(task.dueDate) < new Date()
        );
    }).length;

    const updateTaskStatus = async (id, status) => {
        try {
            await API.put(`/tasks/update/${id}`, { status });
            toast.success("Task updated");
            fetchTasks();
        } catch (error) {
            toast.error("Failed to update task");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Team Task Manager</h1>
                <div className="flex items-center gap-4">
                    <div>
                        <p className="font-semibold">{user?.name}</p>
                        <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                    </div>
                    <button onClick={logoutHandler} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer">Logout</button>
                </div>
            </div>
            <div className="p-6">
                <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-xl font-semibold">Total Tasks</h3>
                        <p className="text-4xl font-bold mt-4">
                            {totalTasks}
                        </p>

                    </div>
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-xl font-semibold">Pending Tasks</h3>
                        <p className="text-4xl font-bold mt-4">{pendingTasks}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-xl font-semibold">Completed Tasks</h3>
                        <p className="text-4xl font-bold mt-4">{completedTasks}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-xl font-semibold">Overdue Tasks</h3>
                        <p className="text-4xl font-bold mt-4 text-red-500">{overdueTasks}</p>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mb-6 mt-6">
                    {user?.role === "admin" && (
                        <>
                            <Link to="/create-project" className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold">Create Project</Link>
                            <Link to="/create-task" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold">Create Task</Link>
                        </>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow p-4 mt-8 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <input type="text" placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 border p-3 rounded-lg outline-none" />

                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border p-3 rounded-lg outline-none">
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow mt-8 p-6">
                    <h2 className="text-2xl font-bold mb-4">Tasks</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 text-left">Title</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">Assigned To</th>
                                    <th className="p-3 text-left">Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTasks.length > 0 ? (
                                    filteredTasks.map((task) => (
                                        <tr key={task._id} className={`border-b ${task.status !== "completed" &&
                                            new Date(task.dueDate) < new Date()
                                            ? "bg-red-50"
                                            : ""
                                            }`}
                                        >
                                            <td className="p-3">{task.title}</td>
                                            <td className="p-3">
                                                <select value={task.status} onChange={(e) => updateTaskStatus(task._id, e.target.value)} className="border px-3 py-1 rounded-lg capitalize">
                                                    <option value="pending">Pending</option>
                                                    <option value="in-progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                            </td>

                                            <td className="p-3">{task.assignedTo?.name}</td>
                                            <td className="p-3">

                                                <div className="flex items-center gap-2">
                                                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                                    {
                                                        task.status !== "completed" &&
                                                        new Date(task.dueDate) < new Date() && (
                                                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Overdue</span>
                                                        )
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    ))

                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center p-6 text-gray-500">No tasks found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;