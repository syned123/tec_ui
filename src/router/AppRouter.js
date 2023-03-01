import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoute } from "../auth/routes/AuthRoute";
import { useAuthStore } from "../hooks/useAuthStore";
import { TecRoutes } from "../tec/routes/tecRoutes";

export const AppRouter = () => {
  // const authStatus = "not-authenticated";
  const { status, checkAuthToken } = useAuthStore();
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
          <Route path="/auth/*" element={<AuthRoute />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/*" element={<TecRoutes />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
