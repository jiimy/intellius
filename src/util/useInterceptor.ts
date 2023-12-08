import axios from "axios";
import { ROOT_API } from "constants/api";
import store from "store";

const apiInstance = axios.create({
  baseURL: `${ROOT_API}`,
  timeout: 5000,
});

apiInstance.interceptors.request.use(
  async (config) => {
    const accessToken = store?.getState().user.atk;

    if (accessToken) {
      config.headers["Authorization"] = `bearer ${accessToken}`;
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  async function (err) {
    return Promise.reject(err);
  }
);

export default apiInstance;
