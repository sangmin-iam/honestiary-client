import { signInWithPopup } from "firebase/auth";

import { ACCESS_TOKEN, AUTHORIZATION } from "../constants/index";
import auth, { googleAuthProvider } from "../config/firebase";
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

    axios.defaults.headers.common[
      AUTHORIZATION
    ] = `Bearer ${data.data.accessToken}`;

    return data.data.user;
  } catch (err) {
    throw new Error(err.response.data.message);
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

export async function getDiaries(params) {
  try {
    const { data } = await axios.get("/diaries", {
      params,
    });

    return data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function getDiary(id) {
  try {
    const { data } = await axios.get(`/diaries/${id}`);

    const { diary } = data.data;

    return diary;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function deleteDiary(id) {
  try {
    const { data } = await axios.delete(`/diaries/${id}`);

    const { result } = data;

    return result;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
