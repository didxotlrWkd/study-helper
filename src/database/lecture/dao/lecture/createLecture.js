const {Lecture} = require('../../../../database')

module.exports = async({title , link, user_id})=> {
    try{
        await Lecture.create({
            title,
            content_url : link,
            user_id
        })
    }catch(err){
        console.error(err)
        throw err
    }
}