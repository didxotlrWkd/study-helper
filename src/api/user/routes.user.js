const express = require('express');
const { login } = require('./controller.user');
const generateToken = require('../jwt/controller.jwt/generateToken');
const findUserById = require('../../database/user/dao/findUserById');
const authToken = require('../../middleware/authToken');

const router = express.Router()

router.post('/login', login, generateToken)

router.use(authToken)

router.post('/userinfo', async(req,res)=> {
    try{
        const {user_id} = req.decoded
        const user = await findUserById(user_id)

        return res.status(200).json(user)
    }catch(err){
        console.error(err)
    }
})


module.exports = router;
