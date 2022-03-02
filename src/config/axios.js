import axios from "axios";

import { ACCESS_TOKEN } from "../constants";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.defaults.headers[ACCESS_TOKEN] = localStorage.getItem(ACCESS_TOKEN);

export default instance;
