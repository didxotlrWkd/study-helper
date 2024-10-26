const {Quiz, Answer} = require('../../../../database')

module.exports = async(lecture_id) => {
    try{
        const quizzes = await Quiz.findAll({
            where : {
                lecture_id
            },
            include : [
                {
                    model : Answer,
                    attributes : [
                        'text',
                    ]
                    
                },
               
            ]
        })

        return quizzes
    }catch(err){
        console.error(err)
    }
}