const express = require('express');
const bodyParser = require('body-parser');
const socket_io = require('socket.io');
const gctl = require('./app/controllers/game');
const mongoose = require('mongoose');

const apiRoute = require('./app/routes/api');
const config = require('./config');

const app = express();

mongoose.connect(config.mongo.database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log("db connection successful")
    },
    err => {
        console.log("db connection failed, " + err)
    }
);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, authorization, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
    next();
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(apiRoute);



var server = app.listen(config.port, () => {
    console.log(`app running on port ${config.port}`);
});

const io = socket_io.listen(server);

io.on('connection', (socket) => {
    socket.on('message', async function (msg) {
        // console.log("received ", msg);
        let message = await gctl.ws_play(msg);
        io.emit('message', message);
    });
});