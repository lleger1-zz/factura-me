import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../hooks";
import { LoginPage } from "../pages";

import { Navigation } from "./Navigation";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h3>Cargando...</h3>;
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/*" element={<Navigation />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
