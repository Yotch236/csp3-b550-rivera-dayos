import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("PublicRoutes token:", token);
  if (token) return <Navigate to="/" replace />;
  return children;
};

export default PublicRoutes;
