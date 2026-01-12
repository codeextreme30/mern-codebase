import React, { useEffect, useState } from "react";
import api from "../services/api"; // Axios instance اللي عملناها في services/api.js

export default function Home() {
  const [status, setStatus] = useState("Loading..."); // حالة الـ API

  useEffect(() => {
    // طلب GET لـ API /status
    api.get("/status")
      .then((res) => {
        setStatus(res.data.message); // إذا نجح الطلب
      })
      .catch((err) => {
        setStatus("API Error");       // إذا صار خطأ
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
