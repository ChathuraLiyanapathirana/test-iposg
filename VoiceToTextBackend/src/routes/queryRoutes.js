// src/routes/queryRoutes.js
const express = require('express');
const router = express.Router();
const { findResponse } = require('../data/responses');

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is operational',
    timestamp: new Date().toISOString()
  });
});

// Voice/text query processing endpoint
router.post('/query', (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        type: 'error',
        data: {
          message: 'Query is required'
        }
      });
    }
    
    // Process the query and return a response
    const response = findResponse(query);
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error processing query:', error);
    return res.status(500).json({
      success: false,
      type: 'error',
      data: {
        message: 'Internal server error'
      }
    });
  }
});

module.exports = router;
