// axios.js
import axios from "axios";

// Setting Axios default for credentials
axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: "https://record-manager-ug87.onrender.com/api/",
  // baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

export default instance;
