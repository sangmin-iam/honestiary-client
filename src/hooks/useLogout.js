import { useDispatch, useSelector } from "react-redux";

import axios from "../config/axios";
import { logout } from "../features/userSlice";

function useLogout() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(({ user }) => user.isLoggedIn);

  function handleLogout() {
    localStorage.removeItem("persist:root");
    axios.defaults.headers = null;
    dispatch(logout());
  }

  return { isLoggedIn, handleLogout };
}

export default useLogout;
