// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./src/routes/queryRoutes'));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Voice-to-Text API',
    endpoints: [
      { method: 'GET', path: '/api/health', description: 'Health check endpoint' },
      { method: 'POST', path: '/api/query', description: 'Process voice/text queries' }
    ]
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    success: false,
    type: 'error',
    data: {
      message: 'Endpoint not found'
    }
  });
});

// Server initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
