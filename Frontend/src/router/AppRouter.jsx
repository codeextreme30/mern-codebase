import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "../hooks/AuthContext";
import { useAuth } from "../hooks/AuthContext";
import  ProtectedRoute from "../router/ProtectedRoute";
import Home from "../pages/homepage";
import Login from "../pages/Login";
import Register from "../pages/RegisterPage";
import PublicRoute from "../router/PublicRoute";

/*  Navbar Component */
function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Code Extreme</Link>

        <div className="d-flex align-items-center">
          {token ? (
            <>
              <Link className="nav-link mx-3" to="/">Home</Link>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link mx-3" to="/login">Login</Link>
              <Link className="nav-link" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
         
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

   
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
