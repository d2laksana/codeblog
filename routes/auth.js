var express = require('express');
const createUserValidator = require('../validators/createUserValidator');
var router = express.Router();
const UsersController = require("../controllers/UsersController");
const AuthController = require('../controllers/AuthController');
const loginValidator = require('../validators/loginValidator');

/* GET users listing. */
router.post('/register', createUserValidator, UsersController.store);
router.post('/login', loginValidator, AuthController.login);

module.exports = router;
