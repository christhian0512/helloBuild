import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

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
    <Stack
          spacing={1}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
      <Box sx={{ p: 2, border: 1, boxShadow: 6, borderColor: 'divider', borderRadius: 1, backgroundColor: '#b6d9f0' }}>
      <h2>Login</h2>
      <TextField variant="outlined" size="small" label="Username"type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      <TextField variant="outlined" size="small" label="Username" type="password"  value={password} onChange={(event) => setPassword(event.target.value)} />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
      </Box>
    </Stack>
  );
};

export default Login;