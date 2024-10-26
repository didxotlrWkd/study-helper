process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { response } = require('express');
const {Quiz, Answer} = require('../../../database');
const answer = require('../../../database/quiz/entity/answer');

module.exports = async function query(lecture_id) {
    try {
        const response = await fetch(
            "https://flow.edutrack.kr/api/v1/prediction/c87b1a6a-186a-4d4d-b7ae-e704565ccb60",
            {
                headers: {
                    Authorization: "Bearer zVhEI9bO9-tphETQyGJfrjv8kBq_q2ufHsxo_kkRHBA",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({question : "퀴즈 알려줘"})
            }
        );
        const result = await response.json();
        for (const quiz of result.text) {
            const { 문제유형, 질문, 선택지, 정답 } = quiz;
            console.log(result.text)
            // Prepare options for multiple-choice questions
            let options = {};
            if (문제유형 === "객관식") {
                options = {
                    option1: 선택지["1"] || null,
                    option2: 선택지["2"] || null,
                    option3: 선택지["3"] || null,
                    option4: 선택지["4"] || null,
                    option5: 선택지["5"] || null,
                };
            }

            // Insert data into the Quiz model
            const created_quiz = await Quiz.create({
                text: 질문,
                type: 문제유형,
                lecture_id, 
                ...options // Spread syntax to include options
                
            });
            await Answer.create({
                quiz_id : created_quiz.id,
                text : 정답
            })
        }
        return "result";
    } catch (err) {
        console.error(err)
        throw err
    }
}