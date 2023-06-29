import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "app/config";

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const [currentUser, loading] = useAuthState(auth);

  if (loading) {
    return null;
  }

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthRoute;
