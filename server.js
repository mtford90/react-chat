'use strict';

var http = require('http'),
    socketio = require('socket.io');

var app = http.createServer(),
    io = socketio(app),
    users = [];

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

// Socket shit
io.on('connection', function(socket) {
  console.log('new connection');

  socket.on('join', function(data) {
    console.log('user joined: ' + data);

    socket.emit('new user', { username: data.username, users: users });
    users.push(data.username);
  });

  socket.on('message', function(data) {
    console.log('new message: ' + data);

    socket.emit('message', { text: data.message });
  });
});

// Serve some html
app.get('/', function(req, res) {
  res.sendFile('public/index.html');
});

app.listen(3000);
