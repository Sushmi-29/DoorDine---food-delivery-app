import axios from "axios";

const api = axios.create({
  baseURL: "https://doordine-food-delivery-app.onrender.com/api/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("doordine_auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
