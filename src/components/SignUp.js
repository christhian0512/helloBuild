import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';


const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    localStorage.setItem("user", JSON.stringify({ username, password }));
    navigate("/login");
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
        <h2>Sign Up</h2>
        <Stack spacing={2}
          direction="row"
          sx={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}>
        <TextField variant="outlined" size="small" label="Username" type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
          <TextField variant="outlined" size="small" label="Password" type="password"  value={password} onChange={(event) => setPassword(event.target.value)} />
          <Button variant="contained" onClick={handleSignUp}>Sign Up</Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default SignUp;