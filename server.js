'use strict';

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    users = [],
    sockets = {};

app.use(express.static(__dirname + '/public'));

// Socket shit
io.on('connection', function(socket) {
  console.log('new connection');

  socket.on('join', function(data) {
    console.log('user joined: ' + data);

    users.push(data.username);
    sockets[socket.id] = data.username;
    socket.emit('new user', { username: data.username, users: users });
  });

  socket.on('message', function(data) {
    console.log('new message: ' + data);

    socket.emit('message', { text: data.message });
  });

  socket.on('disconnect', function() {
    var user = sockets[socket.id],
        index = users.indexOf(user);

    delete user[index];
    delete sockets[socket.id];

    socket.emit('updated users', { users: users });
  });
});

// Serve some html
app.get('/', function(req, res) {
  res.sendFile('public/index.html');
});

app.listen(3000);
