// src/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api", // ← لاحظ /api
  withCredentials: true,
});

export default API;
