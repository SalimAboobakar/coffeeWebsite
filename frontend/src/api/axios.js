// src/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // مثلاً "https://coffeewebsite-server.onrender.com/api"
  withCredentials: true,
});

export default API;
