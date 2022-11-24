import axios from "axios";
export const instance = axios.create({
  baseURL: "http://10.154.65.29:9000/api",
});
