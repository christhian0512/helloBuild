import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import './styles.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");
    if (code) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/github?code=${code}`) 
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("github_token", data.access_token);
          window.location.href = "/dashboard";
        });
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={user || localStorage.getItem("github_token") ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
};

export default App;
