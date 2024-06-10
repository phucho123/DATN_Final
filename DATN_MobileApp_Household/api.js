import axios from "axios";
import Cookies from "js-cookie";
import { SERVER_URL } from "./secrete";

const axiosPublic = axios.create({
  baseURL: SERVER_URL,
});

axiosPublic.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const apiCaller = (method, path, data) => {
  return axiosPublic({
    method,
    headers: {},
    url: `${path}`,
    data,
  });
};
