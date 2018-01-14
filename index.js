const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
var http = require('http');

var request = require('request');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('studio/index-editor'));
app.get('/preview', (req, res) => res.render('studio/preview'));
app.get('/studio/editor', (req, res) => res.render('studio/index-editor'));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
app.use('/api_call', require('./routes/api_call.js'));
