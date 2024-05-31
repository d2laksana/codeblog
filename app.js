"use strict";
require("dotenv").config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT);

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter)
app.use('/api/avatar', express.static('public/images/uploads'));

module.exports = app;
