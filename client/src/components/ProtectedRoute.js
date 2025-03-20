// import { Navigate } from "react-router-dom";
// import { useAuth } from "../AuthContext"; // Import useAuth to check authentication

// const ProtectedRoute = ({ element }) => {
//   const { user } = useAuth(); // Get user from context

//   return user ? element : <Navigate to="/Login" replace />;
// };

// export default ProtectedRoute;
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/Login" replace />;
  }

  return children;
}

