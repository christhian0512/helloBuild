import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import './styles.css';

const OAuthHandler = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");

    if (code) {
      fetch(`http://localhost:5000/auth/github?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            localStorage.setItem("github_token", data.access_token);
            navigate("/dashboard");
          }
        })
        .catch((error) => console.error("Error fetching GitHub token:", error));
    }
  }, [navigate]);

  return null;
};

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
       <OAuthHandler setUser={setUser} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/dashboard"
          element={user || localStorage.getItem("github_token") ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
};

export default App;