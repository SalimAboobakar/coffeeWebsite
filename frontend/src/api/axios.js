// src/axios.js

import axios from "axios";

// استخدم مساراً نسبياً إذا كان الـ frontend والـ API يخدمان من نفس الدومين
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api",
  withCredentials: true,
});

export default API;
