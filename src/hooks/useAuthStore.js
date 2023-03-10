import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import tecApi from "../api/tecApi";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await tecApi.post("/auth", { email, password });
      // console.log({ data });
      localStorage.setItem("token", data.token);
      dispatch(
        onLogin({
          name: data.name,
          lastname: data.lastname,
          id: data.id,
          rol: data.rol,
        })
      );
    } catch (error) {
      // console.log(error.response.data.msg);

      dispatch(
        onLogout({
          msg: error.response.data.msg,
        })
      );
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());
    try {
      const { data } = await tecApi.get("/auth/renew");

      localStorage.setItem("token", data.token);
      dispatch(
        onLogin({
          name: data.name,
          lastname: data.lastname,
          id: data.id,
          rol: data.rol,
        })
      );
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };
  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    checkAuthToken,
    startLogout,
  };
};
