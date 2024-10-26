const express = require('express');
const multer = require('multer');
const { memoryStorage } = require('multer')
const storage = memoryStorage()
const upload = multer({storage})
const { uploadMp3FileToS3, retrieveLecture, retrieveSummarizedLecture, retrieveQuiz, retrieveChatbotHistory, askChatbot } = require('./controller/controller.lecture');

const router = express.Router()


router.post('/upload', upload.single('file') , uploadMp3FileToS3)

router.post('/search/all', retrieveLecture )

router.post('/summary', retrieveSummarizedLecture  )

router.post('/quiz', retrieveQuiz )

// router.post('/quiz/solve' )

// router.post('/quiz/result')

router.post('/chatbot/history', retrieveChatbotHistory)

router.post('/chatbot/ask',askChatbot)



// router.post('/achievement')





module.exports = router;
