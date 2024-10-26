const {Chatbot} = require('../../../database')

module.exports = async({user_id, lecture_id }) => {
    try{
        const chatbotHistory = await Chatbot.findAll({
            where : {
                user_id,
                lecture_id,
            }
        })

        return chatbotHistory
    }catch(err) {
        console.error(err)
        throw err
    }
}