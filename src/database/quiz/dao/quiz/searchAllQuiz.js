const {Quiz} = require('../../../../database')

module.exports = async(lecture_id) => {
    try{
        const quizzes = await Quiz.findAll({
            where : {
                lecture_id
            }
        })

        return quizzes
    }catch(err){
        console.error(err)
    }
}