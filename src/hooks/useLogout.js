import { useDispatch, useSelector } from "react-redux";

import { logout } from "../features/userSlice";

function useLogout() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(({ user }) => user.isLoggedIn);

  function handleLogout() {
    dispatch(logout());
  }

  return { isLoggedIn, handleLogout };
}

export default useLogout;
