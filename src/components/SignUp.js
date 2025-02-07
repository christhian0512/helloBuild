import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    localStorage.setItem("user", JSON.stringify({ username, password }));
    navigate("/login");
  };

  return (
    <Box>
      <h2>Sign Up</h2>

        <TextField variant="outlined" size="small" label="Username" type="text" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
        <TextField variant="outlined" size="small" label="Password" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <Button variant="contained" onClick={handleSignUp}>Sign Up</Button>

    </Box>
  );
};

export default SignUp;