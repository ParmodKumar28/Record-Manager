// axios.js
import axios from "axios";

// Setting Axios default for credentials
axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

export default instance;
