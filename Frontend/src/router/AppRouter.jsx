
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/homepage";
import Login from "../pages/Login";
import Register from "../pages/RegisterPage"

export default function AppRouter() {
  return (
    
    <BrowserRouter>
  
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">MyApp</Link>
          <div className="d-flex justify-content-space-around " >
            <Link className="nav-link mx-4" to="/">Home</Link>
            <Link className="nav-link" to="/login">Login</Link>
         

          </div>
        </div>
      </nav>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
           <Route path="/Register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
