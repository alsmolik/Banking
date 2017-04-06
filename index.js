"use strict";

const express = require('express');
const app = express();
const fs = require('fs');
const models = require('./db');
const path = require("path");

app.use(express.static(__dirname + '/public'));

// read all routes
fs.readdirSync('./modules').forEach(function (dir) {
    if (dir.indexOf('.') == 0) return;
    fs.readdirSync('./modules/' + dir + '/routes/').forEach(function (file) {
        require('./modules/' + dir + '/routes/' + file)(app);
    });
});

models.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3000, function () {
        console.log('Example app listening on port 3000!');
    });
});