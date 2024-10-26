const {Chatbot} = require('../../../database')

module.exports = async({question , response}) =>{
    try{
        await Chatbot.create({
            question,
            response
        })
    }catch(err){
        console.error(err)
        throw err
    }
}