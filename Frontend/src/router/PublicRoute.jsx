import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../hooks/AuthContext";

export default function PublicRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) return null;

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
