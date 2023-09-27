import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { MainLoader } from "ui";
import { auth } from "app/config";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [currentUser, loading] = useAuthState(auth);

  if (loading) {
    return <MainLoader />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Suspense fallback={<MainLoader />}>{children}</Suspense>;
};

export default ProtectedRoute;
