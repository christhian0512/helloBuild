require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;


app.get("/auth/github", async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).json({ error: "No code provided" });

  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } }
    );

    const accessToken = response.data.access_token;
    if (!accessToken) return res.status(400).json({ error: "Failed to get access token" });

    res.json({ access_token: accessToken });
  } catch (error) {
    res.status(500).json({ error: "Failed to authenticate" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
