const express = require('express');

const router = express.Router();
const generateToken = require('./controller.jwt/generateToken')
const refreshToken = require('./controller.jwt/refreshToken')

router.post('/generate',
    generateToken
);


module.exports = router;
