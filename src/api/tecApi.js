import axios from "axios";
const tecApi = axios.create({
  baseURL: "http://localhost:4000/api",
});
tecApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };
  return config;
});

export default tecApi;
