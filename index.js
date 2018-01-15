const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
var http = require('http');
var bodyParser = require('body-parser');

var request = require('request');
var app = express();
const database = require('./lib/database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('studio/index-editor'));
app.get('/preview', (req, res) => res.render('studio/preview'));
app.get('/studio/editor', (req, res) => res.render('studio/index-editor'));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
app.use('/api_call', require('./routes/api_call.js'));

initCustomMiddleware();
initDb();

function initCustomMiddleware() {
    if (process.platform === "win32") {
        require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        }).on("SIGINT", () => {
            console.log('SIGINT: Closing MongoDB connection');
            database.close();
        });
    }

    process.on('SIGINT', () => {
        console.log('SIGINT: Closing MongoDB connection');
        database.close();
    });
}


function initDb() {
    database.open(() => { });
}

