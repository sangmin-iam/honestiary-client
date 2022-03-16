import { useDispatch, useSelector } from "react-redux";

import axios from "../config/axios";
import { AUTHORIZATION } from "../constants/auth";
import { logout } from "../features/userSlice";

function useLogout() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(({ user }) => user.isLoggedIn);

  function handleLogout() {
    localStorage.removeItem("persist:root");
    delete axios.defaults.headers.common[AUTHORIZATION];
    dispatch(logout());
  }

  return { isLoggedIn, handleLogout };
}

export default useLogout;
