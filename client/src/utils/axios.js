import axios from "axios";
import jwtDecode from "jwt-decode";
import { refreshToken as resetToken } from "../utils/reducer/AuthSlice";
const baseURL = "http://localhost:8000";
const accessToken = localStorage.getItem("accessToken") || null;
const axiosClient = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    authorization: `Bearer ${accessToken}`,
  },
});
export const axiosPrivate = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

axiosClient.interceptors.request.use(async (config) => {
  if (config.headers.authorization) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      let currentDate = new Date().getTime();
      const token = jwtDecode(accessToken);
      if (token.exp * 1000 < currentDate) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const res = await resetToken({
              refreshToken: refreshToken,
              accessToken: accessToken,
            });
            localStorage.setItem("accessToken", res.payload.accessToken);
            localStorage.setItem("refreshToken", res.payload.refreshToken);
          } catch (err) {
            window.location.href = "/login";
          }
        } else {
          window.location.href = "/login";
        }
      } else {
        return config;
      }
    } else {
      window.location.href = "/login";
    }
  }
  return config;
});

export default axiosClient;
