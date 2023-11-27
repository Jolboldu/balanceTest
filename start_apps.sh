#!/bin/bash

# Start Node.js app 1
echo "Starting App 1..."
cd ./
PORT=3001 WRITE=1 INDEX=0 node index.js &

# Store the PID of the last background process
pid_app1=$!

# Start Node.js app 2
echo "Starting App 2..."
cd ./
PORT=3002 INDEX=1 node index.js &

# Store the PID of the last background process
pid_app2=$!

# Start Node.js app 3
echo "Starting App 3..."
cd ./
PORT=3003 INDEX=2 node index.js &

# Store the PID of the last background process
pid_app3=$!

# Start Node.js app 4
echo "Starting App 4..."
cd ./
PORT=3004 INDEX=3 node index.js &

# Store the PID of the last background process
pid_app4=$!

# Start Node.js app 5
echo "Starting App 5..."
cd ./
PORT=3005 INDEX=4 node index.js &

# Store the PID of the last background process
pid_app5=$!

# Trap the interrupt signal (e.g., Ctrl+C) to gracefully stop the apps
trap 'kill $pid_app1 $pid_app2 $pid_app3 $pid_app4 $pid_app5; exit' INT

# Wait for all background processes to finish
wait
