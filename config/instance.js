import axios from "axios";

const instance = axios.create({
  // baseURL: "http://18.133.142.150:4400/host/",
  // baseURL: "http://localhost:9093/host/",
  baseURL: "https://hostapi.requeue.com/host/",
  // baseURL: "http://192.168.1.23:9093/host/",
});
export default instance;
