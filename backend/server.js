require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
// The Apache proxy strips the '/api' prefix before forwarding the request.
// We mount the router at the root ('/') so Express can handle the remaining path (e.g., '/companies').
app.use('/', apiRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.send('Backend server is running.');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});