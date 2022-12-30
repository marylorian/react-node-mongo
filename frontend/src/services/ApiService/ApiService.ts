import axios from "axios";
import config from "../../config/config";

const axiosInstance = axios.create({
  baseURL: config.apiUrl,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: localStorage.getItem("access_token")
      ? `Bearer ${localStorage.getItem("access_token")}`
      : undefined,
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      window.history.pushState({}, "", "/login");
    }
  }
);

export default axiosInstance;
