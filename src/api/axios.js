import { signInWithPopup } from "firebase/auth";

import { auth, googleAuthProvider } from "../config/firebase";
import { ACCESS_TOKEN } from "../constants/index";
import axios from "../config/axios";

export async function firebaseGoogleLogin() {
  try {
    const { user } = await signInWithPopup(auth, googleAuthProvider);

    const userInfo = {
      email: user.email,
      name: user.displayName,
    };

    const { data } = await axios.post("/auth/login", userInfo, {
      withCredentials: true,
    });

    localStorage.setItem(ACCESS_TOKEN, data.data.accessToken);

    axios.defaults.headers.common[ACCESS_TOKEN] = data.data.accessToken;

    return data.data.user;
  } catch (err) {
    throw new Error("Failed to login in");
  }
}
