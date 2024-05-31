"use strict";

const { body } = require("express-validator");
const users = require("../models/users");

const createUserValidator = [
    body('name')
        .notEmpty()
        .withMessage("Name Required!")
        .isString()
        .withMessage("Name must be string"),
    body('email')
        .notEmpty()
        .withMessage("Email Required")
        .isEmail()
        .withMessage("Email not valid")
        .custom(async value => {
            const user = await users.findOne({ where: { email: value } });
            if (user) {
                throw new Error("Email already registered");
            }
            return true
        }),
    body('password')
        .notEmpty()
        .withMessage("Password Required"),
    body('passwordConfirmation')
        .notEmpty()
        .withMessage("Confirmation Password Required")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password not match");
            }
            return true
        })
];

module.exports = createUserValidator;