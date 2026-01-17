import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {
  const [status, setStatus] = useState("Loading..."); 

  useEffect(() => {

    api.get("/status")
      .then((res) => {
        setStatus(res.data.message); 
      })
      .catch((err) => {
        setStatus("API Error");       
        console.error(err);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-3">Home Page</h1>
      <p>مرحبا بك في الصفحة الرئيسية!</p>

      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">API Status</h5>
          <p className="card-text">{status}</p>
        </div>
      </div>
    </div>
  );
}
