const { where } = require('sequelize')
const {Lecture} = require('../../../../database')

module.exports = async({user_id})=> {
    try{
        const lectures = await Lecture.findAll({
            where : {
                user_id
            }
        })

        return lectures
    }catch(err){
        console.error(err)
        throw err
    }
}