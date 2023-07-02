import { lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProtectedRoute from "app/routes/ProtectedRoute";
import AuthRoute from "app/routes/AuthRoute";

const Signup = lazy(() => import("pages/Signup"));
const Login = lazy(() => import("pages/Login"));
const Main = lazy(() => import("pages/Main"));

const App: React.FC = () => {
  const { i18n } = useTranslation();

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthRoute>
            <Signup />
          </AuthRoute>
        }
      />
      <Route
        path="/login"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />
      <Route
        path="*"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />
    </Routes>
  );
};

export default App;
