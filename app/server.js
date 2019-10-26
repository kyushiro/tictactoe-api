const express = require('express');
const bodyParser = require('body-parser');
const socket_io = require('socket.io');

const apiRoute = require('./routes/api');
const config = require('./../config');

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(apiRoute);


var server = app.listen(config.port, () => {
    console.log(`app running on port ${config.port}`);
});

const io = socket_io.listen(server);

io.on('connection', (socket) => {
    console.log('Hello through socket.io');
});