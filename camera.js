'use strict';

const express = require('express'),
      app = express(),
      server = require('http').Server(app),
      sockjs = require('sockjs'),
      os = require('os'),
      path = require('path'),
      port = 8000;

const av = require('tessel-av');

app.use(express.static(path.join(__dirname, '/public')));

const vstream = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' });
vstream.on('connection', conn => {
  const camera = new av.Camera();
  camera.stream();

  conn.on('data', () => camera.stream());

  camera.on('data', data => {
    conn.write(data.toString('base64'));
  });

  conn.on('close', () => {});
});

vstream.installHandlers(server, { prefix: '/vstream' });

server.listen(port, () => {
  console.log(`http://${os.hostname()}.local:${port}`);
});

process.on("SIGINT", _ => server.close());