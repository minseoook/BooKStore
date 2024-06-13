import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../store/authStore";
import { refresh } from "./auth.api";

const BASE_URL = "http://localhost:9999";
const DEFAULT_TIMEOUT = 30000;

export const authhttpClient = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "content-type": "application/json",
    //   Authorization: getToken() ? getToken() : "",
  },
  withCredentials: true,
});

//   axiosInstance.interceptors.request.use(
//     (config) => {
//       //   config.headers["Authorization"] = `${getToken()}`;
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
authhttpClient.interceptors.request.use(
  async (config) => {
    const { token, isAdmin } = useAuthStore.getState();
    if (!token) {
      window.location.href = "/login";
      return Promise.reject();
    }
    const currentDate = new Date();
    const decodedToken = jwtDecode(token);

    if (decodedToken && decodedToken.exp) {
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refresh();

        config.headers["authorization"] = data.accessToken;
        useAuthStore.getState().loginAction(data.accessToken, isAdmin);
      } else {
        config.headers["authorization"] = useAuthStore.getState().token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authhttpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //로그인 만료 처리
    if (error.response && error.response.status === 401) {
      useAuthStore.getState().logoutAction();
      // window.location.href = "/login";
      return;
    }
    return Promise.reject(error);
  }
);
