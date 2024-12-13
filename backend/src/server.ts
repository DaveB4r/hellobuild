import express from "express";
import axios, { HttpStatusCode } from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get("/auth/github", (req, res) => {
  const redirectUri = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=read:user`;
  res.redirect(redirectUri);
});

app.get("/auth/callback", async (req, res) => {
  const { code } = req.query;
  try {
    
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const { access_token } = response.data;
    res.json({ access_token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
