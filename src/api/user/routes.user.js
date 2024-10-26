const express = require('express');
const { login } = require('./controller.user');
const generateToken = require('../jwt/controller.jwt/generateToken');

const router = express.Router()

router.post('/login', login, generateToken)


module.exports = router;
