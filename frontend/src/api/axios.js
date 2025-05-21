// src/axios.js

import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api",
  withCredentials: true,
});
