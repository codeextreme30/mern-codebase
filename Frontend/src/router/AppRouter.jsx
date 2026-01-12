import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/homepage";
import Login from "../pages/Login";

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
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-6">
          <h2>محتوى العمود الأول</h2>
          <p>هنا بعض النصوص أو الصور.</p>
        </div>
        <div className="col-12 col-md-6">
          <h2>محتوى العمود الثاني</h2>
          <p>هنا نصوص أو عناصر أخرى.</p>
        </div>
      </div>
    </div>

<button className="btn btn-primary btn-sm btn-md m-5">Click Me</button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
