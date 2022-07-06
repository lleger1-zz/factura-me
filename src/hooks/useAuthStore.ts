import { invoiceApi } from "../apis";
import { AuthRequestResponse } from "../interfaces";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
  onLogoutInvoice,
} from "../store";
import { useAppDispatch, useAppSelector } from "./reduxHook";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const startLogin = async (email: string, password: string) => {
    dispatch(onChecking());
    try {
      const { data } = await invoiceApi.post<AuthRequestResponse>("/auth", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ ...data.user }));
    } catch (error) {
      console.log(error);
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout(undefined));

    try {
      const { data } = await invoiceApi.get<AuthRequestResponse>("auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ ...data.user }));
    } catch (error) {
      const concept = localStorage.getItem("lastConcept");
      localStorage.clear();
      localStorage.setItem("lastConcept", concept || "");
      dispatch(onLogout(undefined));
    }
  };

  const startLogout = () => {
    const concept = localStorage.getItem("lastConcept");
    localStorage.clear();
    localStorage.setItem("lastConcept", concept || "");
    dispatch(onLogout(undefined));
    dispatch(onLogoutInvoice());
  };

  return {
    //* Propiedades
    errorMessage,
    status,
    user,

    //* Métodos
    checkAuthToken,
    startLogin,
    startLogout,
  };
};
