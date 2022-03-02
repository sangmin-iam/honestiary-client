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

    const { data } = await axios.post("/auth/login", userInfo);

    localStorage.setItem(ACCESS_TOKEN, data.data.accessToken);

    axios.defaults.headers.common[ACCESS_TOKEN] = data.data.accessToken;

    return data.data.user;
  } catch (err) {
    throw new Error("Failed to login in");
  }
}

export async function createDiary(formData) {
  try {
    await axios.post("/diaries", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
