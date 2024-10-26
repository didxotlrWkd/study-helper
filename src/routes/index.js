const express = require('express');

const router = express.Router();

const lectureRouter = require('../api/lecture/routes.lecture')
const userRouter = require('../api/user/routes.user')

router.use(('/lecture'), lectureRouter)
router.use(('/user'), userRouter)

router.get('/' , (req,res) => {
    res.send("hihi");
})


module.exports = router;
