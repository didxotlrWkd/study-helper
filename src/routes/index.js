const express = require('express');

const router = express.Router();

const jwtRouter = require('../api/jwt/route.jwt')


router.use('/jwt', jwtRouter)

router.get('/' , (req,res) => {
    res.send("hihi");
})


module.exports = router;
