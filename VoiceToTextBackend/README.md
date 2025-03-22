# Voice-to-Text Backend API

A simple Express.js backend API for processing voice/text queries with predefined responses.

## Features

- Simple API endpoints for processing text/voice queries
- Predefined response mapping for common queries
- Health check endpoint
- Basic error handling

## Project Structure

```
/src
  /routes         # API routes
  /data           # Static response data
.env              # Environment variables
server.js         # Entry point
```

## API Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/query` - Process voice/text queries

## Response Types

The API supports multiple response types:
- Weather information
- Time information
- Location/directions
- Product information
- Business hours
- Help/assistance
- General information

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5001
   NODE_ENV=development
   ```

### Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Usage

### Query Endpoint

```bash
curl -X POST http://localhost:5001/api/query \
  -H "Content-Type: application/json" \
  -d '{"query": "what time is it"}'
```

Sample Response:
```json
{
  "success": true,
  "type": "time",
  "data": {
    "message": "The current time is 12:34:56 PM"
  }
}
```
