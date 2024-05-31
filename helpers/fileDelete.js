"use strict";

const fs = require('fs');


async function fileDel(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) throw err;
    });
};

module.exports = fileDel;