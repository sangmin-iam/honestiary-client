import axios from "axios";

import { ACCESS_TOKEN, AUTHORIZATION } from "../constants/auth";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

const token = localStorage.getItem(ACCESS_TOKEN);

instance.defaults.headers.common[AUTHORIZATION] = `Bearer ${token}`;

export default instance;
