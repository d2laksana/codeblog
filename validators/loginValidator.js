"use strict";
const { body } = require("express-validator");


const loginValidator = [
    body('email')
        .notEmpty()
        .withMessage('Email required'),
    body('password')
        .notEmpty()
        .withMessage('Password Required'),
];

module.exports = loginValidator;