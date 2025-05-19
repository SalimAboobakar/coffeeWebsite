import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;
console.log(">>> API baseURL:", baseURL);
const api = axios.create({ baseURL });
api.interceptors.request.use((cfg) => {
  console.log("→ API request:", cfg.method, cfg.baseURL + cfg.url);
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
export default api;
