const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use((req, res) => {
  res.send(`<!DOCTYPE html>
  <html>
  <head>
    <title>Access Denied</title>
    <style>
      body {
        background: #111;
        color: #fff;
        font-family: monospace;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        text-align: center;
      }
      .message {
        border: 2px solid #6a00ff;
        padding: 30px;
        border-radius: 10px;
        background-color: #1a1a1a;
        max-width: 600px;
      }
      h1 {
        color: #ff4c4c;
        font-size: 28px;
      }
      .status {
        margin-top: 10px;
        font-size: 16px;
        color: #bbb;
      }
      .footer {
        margin-top: 20px;
        font-size: 14px;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="message">
      <h1>Access backend<br>Access denied</h1>
      <p>Contact the Administrator</p>
      <div class="status">
        Render status: <strong style="color: #0f0;">ok</strong><br>
        Browser status: <strong style="color: #0f0;">proxyed</strong>
      </div>
      <div class="footer">
        <br>Back end powered by Render<br>
        &copy; 2025 - 2026 The Lunabotai Co and Charmers Business USA 2025
      </div>
    </div>
  </body>
  </html>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚫 Backend access screen running on port ${PORT}`);
});
