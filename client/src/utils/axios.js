import axios from "axios";
import jwtDecode from "jwt-decode";
const baseURL = "http://localhost:8000/";
const accessToken = localStorage.getItem("accessToken") || null;
const axiosClient = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

// axiosClient.interceptors.request.use(
//   async (config) => {
//     const auth = JSON.parse(localStorage.getItem("auth"));
//     let currentDate = new Date();
//     if (auth?.accessToken) {
//       const decodedToken = jwtDecode(auth?.accessToken);
//       if (decodedToken.exp * 1000 < currentDate.getTime()) {
//         const res = await axiosClient.post("/auth/refresh-token", {
//           accessToken: auth.accessToken,
//           refreshToken: auth.refreshToken,
//         });
//         localStorage.setItem("auth", res.data);
//         config.headers["authorization"] = `Bearer ${res.data.accessToken}`;
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (
      error.response.status === 403 &&
      originalRequest.url === baseURL + "/auth/refresh-token/"
    ) {
      window.location.href = "/";
      return Promise.reject(error);
    }
    // console.log(error.response);
    if (
      error.response.status === 403 &&
      error.response.statusText === "Forbidden"
    ) {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (accessToken && refreshToken) {
        let currentDate = new Date();
        const decodedToken = jwtDecode(accessToken);
        console.log(decodedToken.exp);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          return axiosClient
            .post("/auth/refresh-token/", {
              refreshToken: refreshToken,
              accessToken: accessToken,
            })
            .then((response) => {
              localStorage.setItem("accessToken", response.data.accessToken);
              localStorage.setItem("refreshToken", response.data.refreshToken);

              axiosClient.defaults.headers["Authorization"] =
                "Bearer " + response.data.accessToken;
              originalRequest.headers["Authorization"] =
                "Bearer " + response.data.accessToken;

              return axiosClient(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log(
            "Refresh token is expired",
            decodedToken.exp,
            currentDate
          );
          // localStorage.removeItem("accessToken");
          // localStorage.removeItem("refreshToken");
        }
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/login";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosClient;
