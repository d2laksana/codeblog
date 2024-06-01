"use strict";

const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const upload = require("../helpers/fileUpload");
const users = require("../models/users");
const fileDel = require("../helpers/fileDelete");
const { response500, response404, response400 } = require("../helpers/response");
const { response } = require("express");

async function store(req, res) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) return res.status(400).json({
            success: false,
            code: 400,
            message: error.array().map(e => e.msg)
        });

        const hashPass = await bcrypt.hash(req.body.password, 10);
        const data = {
            name: req.body.name,
            email: req.body.email,
            pass: hashPass,
        };

        const newUser = await users.create(data);
        if (newUser) return res.status(200).json({
            success: true,
            code: 200,
            message: 'Berhasil menambahkan user',
            data: data
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }
};

async function avatar(req, res) {
    try {
        if (!req.file) return response400(res, "image file required");

        const user = await users.findByPk(req.params.id);

        user.avatar = req.file.path;
        await user.save();

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Avatar Uploaded',
            data: user
        });

    } catch (err) {
        return response500(res, err.message);
    }
}

async function show(req, res) {
    try {
        const user = users.findByPk(req.params.id);
        if (!user) return response404(res, "User not found");

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Found User',
            data: user
        });

    } catch (err) {
        return response500(res, err.message);
    }
}

async function update(req, res) {
    try {
        const user = users.findByPk(req.params.id);
        if (!user) return response404(res, "User not found");

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        user.save();

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Success Updated Data',
            data: user
        });

    } catch (err) {
        return response500(res, err.message);
    }
}


async function destroy(req, res) {
    try {
        const user = await users.findByPk(req.params.id);
        if (!user) return response404(res, 'User tidak ditemukan');

        fileDel(user.avatar);

        await user.destroy();

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Data berhasil dihapus'
        });
    } catch (err) {
        return response500(res, err.message);
    }
}


module.exports = {
    store,
    destroy,
    avatar,
    show,
    update
}