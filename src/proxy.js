const express = require('express');
const axios = require('axios');
const app = express();
const port = 3005;

// Add CORS headers to allow all origins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.use(express.json());

// Handle proxy requests
app.post('/proxy', async (req, res) => {
  try {
    const { url, method, headers, body } = req.body;

    // Forward the request to the target API
    const response = await axios({
      url,
      method,
      headers,
      data: body, // Use 'data' for the request body in Axios
    });

    // Send the response back to the frontend
    res.json(response.data);
  } catch (error) {
    // Handle errors (like 404, 500) gracefully
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
