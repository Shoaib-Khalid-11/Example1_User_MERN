import { Navigate } from "react-router";
import { useAuthStore } from "store/slices";
import type { AppChildrenProp } from "typescript/interface";

export const ProtectedRoute_Guard = ({ children }: AppChildrenProp) => {
  // const navigate = useNavigate();
  const {
    authState: { isAuthenticated },
  } = useAuthStore();
  if (!isAuthenticated) {
    // navigate("/login");
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute_Guard;
