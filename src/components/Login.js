import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      setUser(storedUser);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <TextField variant="outlined" size="small" label="Username"type="text" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
      <TextField variant="outlined" size="small" label="Username" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Login;