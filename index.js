const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
app.use(cors());

// Homepage: Access Denied screen
app.get('/', (req, res) => {
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

// Proxy route using Puppeteer
app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('Missing url query parameter');
  }

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'
    );

    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    const content = await page.content();
    await browser.close();

    res.send(content);
  } catch (err) {
    console.error('Puppeteer Error:', err);
    res.status(500).send('Failed to load target website.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Frame Browser backend running on port ${PORT}`);
});
