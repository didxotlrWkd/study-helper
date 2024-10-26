const findUserById = require("../../database/user/dao/findUserById")
const findUserByIdPassword = require("../../database/user/dao/findUserByIdPassword")


const login = async (req, res, next) => {
    const { email , password } = req.body
    try {
        const user = await findUserByIdPassword({email, password})
        
        if(user) {
            req.user_id = user.id
            return next()
        }else{
            return res.status(401).json({message : "login fail"})
        }
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


module.exports = {
    login
}