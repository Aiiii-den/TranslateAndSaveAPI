#!/bin/bash

# Start the Node.js server
node server.js &

# Wait for the server to start
sleep 5

# Populate the MongoDB database
echo "Populating the MongoDB database..."
node autofill_db.js
