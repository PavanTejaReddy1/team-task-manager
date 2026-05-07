import axios from "axios";

const API = axios.create({baseURL: "https://team-task-manager-6xaail5wc-pavan-teja-reddys-projects.vercel.app/api"});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;