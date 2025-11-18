import axios from "axios";
import axios from "./api/axios.js";


const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend base URL
  withCredentials: true,
});

export default api;
