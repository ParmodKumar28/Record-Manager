// axios.js
import axios from "axios";

// Setting Axios default for credentials
axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export default instance;
