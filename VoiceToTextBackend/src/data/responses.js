// src/data/responses.js
const responseMap = {
  "weather": {
    pattern: /weather|temperature|forecast/i,
    response: { type: "weather", message: "The weather today is sunny with a high of 75°F" }
  },
  "time": {
    pattern: /time|what time|current time/i,
    response: { 
      type: "time", 
      message: `The current time is ${new Date().toLocaleTimeString()}` 
    }
  },
  "location": {
    pattern: /where|location|address|direction/i,
    response: { 
      type: "location", 
      message: "The store is located at 123 Main Street, downtown" 
    }
  },
  "products": {
    pattern: /product|item|inventory|stock|sale/i,
    response: { 
      type: "products", 
      message: "We have several products available",
      items: [
        { id: 1, name: "Product A", price: 19.99 },
        { id: 2, name: "Product B", price: 29.99 },
        { id: 3, name: "Product C", price: 39.99 }
      ]
    }
  },
  "help": {
    pattern: /help|support|assist/i,
    response: { 
      type: "help", 
      message: "How can I assist you today? You can ask about our products, location, business hours, or general information." 
    }
  },
  "hours": {
    pattern: /hours|open|close|schedule/i,
    response: { 
      type: "hours", 
      message: "Our business hours are Monday to Friday, 9 AM to 5 PM" 
    }
  },
  "general": {
    pattern: /.*/, // Default fallback pattern
    response: { 
      type: "general", 
      message: "I'm not sure how to respond to that. Could you please rephrase your question?" 
    }
  }
};

// Find the first matching response for a given query
const findResponse = (query) => {
  if (!query) {
    return {
      success: false,
      type: "error",
      data: {
        message: "No query provided"
      }
    };
  }

  // Find the first matching pattern
  for (const key in responseMap) {
    if (responseMap[key].pattern.test(query)) {
      const { type, message, items } = responseMap[key].response;
      return {
        success: true,
        type,
        data: {
          message,
          type,
          ...(items && { items })
        }
      };
    }
  }

  // If no match, return the general response
  const { type, message } = responseMap.general.response;
  return {
    success: true,
    type,
    data: {
      type,
      message
    }
  };
};

module.exports = { findResponse };
