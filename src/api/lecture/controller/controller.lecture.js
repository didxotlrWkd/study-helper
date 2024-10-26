const findAllChatbotHistoryByUserIdLectureId = require('../../../database/chatbot/dao/findAllChatbotHistoryByUserIdLectureId')
const createLecture = require('../../../database/lecture/dao/lecture/createLecture')
const searchAllLecture = require('../../../database/lecture/dao/lecture/searchAllLecture')
const findSummarizedLecture = require('../../../database/lecture/dao/summary/findSummarizedLecture')
const searchAllQuiz = require('../../../database/quiz/dao/quiz/searchAllQuiz')
const uploadFile = require('../../../middleware/uploadAudio')
const axios = require('axios')
const chatbot = require('../service/chatbot')
const createChatbotHistory = require('../../../database/chatbot/dao/createChatbotHistory')
const summary = require('../service/summary')
const quiz = require('../service/quiz')


const uploadMp3FileToS3 = async (req, res) => {
    try {
        const user_id = 1
        const {title} = req.body
        const file = req.file.buffer
        const filename = req.file.originalname
        const bucketname = process.env.bucketname
        // // link is the returned object URL from S3
        const link = await uploadFile(filename, bucketname, file)
        await createLecture({title , link, user_id})

        return res.status(200).json({ file_url : link})
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
}

const retrieveSummarizedLecture = async(req,res) => {
    try{
       const {lecture_id} = req.body 

       const summary = await findSummarizedLecture({lecture_id})

       const response = await axios.get(summary.content_url);
    
       res.status(200).json(response.data)
        
    }catch(err){
        console.error(err)
        return res.status(500).json({error : err.message})
    }
}

const retrieveLecture = async(req,res)=>{
    try{

        const user_id = 1
        const lectures = await searchAllLecture({user_id})

        return res.status(200).json(lectures)

    }catch(err){
        console.error(err)
        res.status(500).json({error: err.message})
    }
}



const retrieveQuiz = async(req,res) => {
    try{
        const {lecture_id} = req.body

        const quizzes = await searchAllQuiz(lecture_id)
        
        if(quizzes.length == 0) {
            await quiz({question : "질문 생성해줘"})
            const quizzes = await searchAllQuiz(lecture_id)
            return res.status(200).json(quizzes)
        }

        return res.status(200).json(quizzes)
    }catch(err){
        console.error(err)
        res.status(500).json({error: err.message})
    }
}

const retrieveChatbotHistory = async(req,res) => {
    try{
        const user_id = 1
        const {lecture_id} = req.body
        const chatbotHistory = await findAllChatbotHistoryByUserIdLectureId({user_id , lecture_id})

        return res.status(200).json(chatbotHistory)
    }catch(err){
        console.error(err)
        res.status(500).json({error : err.message})
    }
}

const askChatbot = async(req,res) => {
    try{
        const {question} = req.body

        const ask = {"question" : question}

        const response = await chatbot(ask)

        await createChatbotHistory({question, response : response.text})

        return res.status(200).json(response.text)
    }catch(err){
        console.error(err)
        res.status(500).json({error : err.message})
    }
}




module.exports = {
    uploadMp3FileToS3,
    retrieveSummarizedLecture,
    retrieveLecture,
    retrieveQuiz,
    retrieveChatbotHistory,
    askChatbot,
}