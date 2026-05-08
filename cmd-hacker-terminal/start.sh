#!/bin/bash

# CMD Hacker Terminal - Startup Script

echo "🖥️  Starting CMD Hacker Terminal..."
echo ""

# Check if node server.js is already running
if pgrep -f "node server.js" > /dev/null; then
    echo "✓ Backend server is already running"
else
    echo "▶ Starting backend server..."
    node server.js &
    SERVER_PID=$!
    echo "✓ Backend server started (PID: $SERVER_PID)"
    echo ""
fi

# Wait a moment for the server to start
sleep 2

# Check if the server is responding
if curl -s http://localhost:3001/health > /dev/null 2>&1; then
    echo "✓ Backend server is ready"
else
    echo "⚠ Warning: Backend server may not be responding correctly"
fi

echo ""
echo "▶ Starting frontend..."
echo ""
echo "Open this URL in your browser:"
echo "   http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start the frontend
npm run dev

# Cleanup: kill the backend server when frontend exits
if [ ! -z "$SERVER_PID" ]; then
    kill $SERVER_PID 2>/dev/null
    echo ""
    echo "✓ Backend server stopped"
fi
