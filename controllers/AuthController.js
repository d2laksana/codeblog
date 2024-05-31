"use strict";


const bcrypt = require('bcrypt');
const users = require('../models/users');
const jwt = require('jsonwebtoken');
const { response400, response500 } = require('../helpers/response');
const { validationResult } = require('express-validator');

async function login(req, res) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty) {
            return response400(res, error.array().map(e => e.msg));
        }

        const user = await users.findOne({ where: { email: req.body.email } });
        if (!user) return response400(res, 'Email not registered');

        const check = await bcrypt.compare(req.body.password, user.password);
        if (!check) return response400(res, 'Wrong Password');

        const payload = {
            sub: user.id,
            exp: new Date().setDate(new Date().getDate() + 10),
            iat: new Date().getTime()
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: "HS512" });

        user.token = token;
        await user.save();


        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Login Success',
            data: {
                _id: user.id,
                name: user.name,
                email: user.email,
                apikey: user.apikey,
                token: token
            }
        });


    } catch (err) {
        return response500(res, err.message);
    }
}

module.exports = {
    login
}