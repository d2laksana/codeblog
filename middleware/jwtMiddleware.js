"use strict";
const jwt = require('jsonwebtoken');
const users = require('../models/users');
const { response401 } = require('../helpers/response');

async function JwtMiddleware(req, res, next) {
    try {
        const token = req.header('Authorization').split(' ')[1];

        // verif token
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // verif user
        const user = await users.findOne({ where: { id: decode.sub } });


        if (!user) return response401(res);

        next();
    } catch (err) {
        return response401(res, err.message);
    }
}

module.exports = JwtMiddleware;