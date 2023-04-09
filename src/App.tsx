import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./app/routes/ProtectedRoute";
import AuthRoute from "./app/routes/AuthRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Main from "./pages/Main";

const App: React.FC = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

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
