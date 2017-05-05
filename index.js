"use strict";

const express = require('express');
const app = express();
const fs = require('fs');
const models = require('./db');
const path = require("path");
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(bearerToken());

// read all routes
fs.readdirSync('./modules').forEach(function (dir) {
    if (dir.indexOf('.') == 0) return;
    if (fs.existsSync('./modules/' + dir + '/routes/'))
        fs.readdirSync('./modules/' + dir + '/routes/').forEach(function (file) {
            require('./modules/' + dir + '/routes/' + file)(app);
        });
});

models.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3000, function () {
        console.log('Example app listening on port 3000!');
    });
});