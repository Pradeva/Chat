const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../public')));

const userMap = {}; // socket.id => username

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('set-username', (username) => {
    userMap[socket.id] = username || 'Anonim';
  });

  socket.on('chat-message', (msg) => {
    const name = userMap[socket.id] || 'Anonim';
    socket.broadcast.emit('chat-message', { name, msg });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    delete userMap[socket.id];
  });
});

server.listen(3000, () => {
  console.log('Server jalan di http://localhost:3000');
});
