process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const {Quiz} = require('../../../database')

module.exports = async function query(data) {
    try {
        const response = await fetch(
            "https://flow.edutrack.kr/api/v1/prediction/c87b1a6a-186a-4d4d-b7ae-e704565ccb60",
            {
                headers: {
                    Authorization: "Bearer zVhEI9bO9-tphETQyGJfrjv8kBq_q2ufHsxo_kkRHBA",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(data)
            }
        );
        const result = await response.json();
        for (const quiz of result.text) {
            const { 문제유형, 질문, 선택지 } = quiz;

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
            await Quiz.create({
                text: 질문,
                type: 문제유형,
                ...options // Spread syntax to include options
            });
        }
        return result;
    } catch (err) {
        console.error(err)
        throw err
    }
}