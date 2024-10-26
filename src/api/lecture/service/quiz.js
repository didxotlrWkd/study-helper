process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { response } = require('express');
const {Quiz, Answer} = require('../../../database');
const answer = require('../../../database/quiz/entity/answer');

module.exports = async function query(lecture_id) {
    try {
        // const response = await fetch(
        //     "https://flow.edutrack.kr/api/v1/prediction/c87b1a6a-186a-4d4d-b7ae-e704565ccb60",
        //     {
        //         headers: {
        //             Authorization: "Bearer zVhEI9bO9-tphETQyGJfrjv8kBq_q2ufHsxo_kkRHBA",
        //             "Content-Type": "application/json"
        //         },
        //         method: "POST",
        //         body: JSON.stringify({question : "퀴즈 알려줘"})
        //     }
        // );
        // const result = await response.json();

        const result = [
            {
                "문제유형": "객관식",
                "질문": "소프트웨어 공학에서 소프트웨어 개발 절차의 공통적인 단계가 아닌 것은?",
                "선택지": {
                    "1": "요구사항 분석",
                    "2": "설계",
                    "3": "코딩",
                    "4": "배포",
                    "5": "테스팅"
                },
                "정답": "4"
            },
            {
                "문제유형": "객관식",
                "질문": "소프트웨어 공학에서 SQA는 무엇을 의미하는가?",
                "선택지": {
                    "1": "Software Quality Assurance",
                    "2": "Software Quick Access",
                    "3": "System Quality Assurance",
                    "4": "System Quick Access",
                    "5": "Software Query Analysis"
                },
                "정답": "1"
            },
            {
                "문제유형": "객관식",
                "질문": "소프트웨어 공학에서 Verification과 Validation의 차이점은 무엇인가?",
                "선택지": {
                    "1": "Verification은 사용자 요구사항 검증, Validation은 설계 검증",
                    "2": "Verification은 설계 검증, Validation은 사용자 요구사항 검증",
                    "3": "Verification은 코드 검증, Validation은 사용자 요구사항 검증",
                    "4": "Verification은 사용자 요구사항 검증, Validation은 코드 검증",
                    "5": "Verification과 Validation은 동일한 의미"
                },
                "정답": "2"
            },
            {
                "문제유형": "단답식",
                "질문": "소프트웨어 공학에서 소프트웨어 개발 절차의 네 가지 공통적인 단계는 무엇인가?",
                "정답": "요구사항 분석, 설계, 코딩, 테스팅"
            },
            {
                "문제유형": "단답식",
                "질문": "소프트웨어 공학에서 매트릭스를 사용하는 주요 목적은 무엇인가?",
                "정답": "프로젝트의 진행 상황과 소프트웨어의 품질을 객관적으로 평가하기 위해서"
            },
            {
                "문제유형": "단답식",
                "질문": "소프트웨어 공학에서 SQA의 풀 네임은 무엇인가?",
                "정답": "Software Quality Assurance"
            },
            {
                "문제유형": "서술형",
                "질문": "소프트웨어 공학에서 소프트웨어 개발 절차를 정해진 대로 따르는 것이 왜 중요한가?",
                "정답": "소프트웨어 개발 절차를 정해진 대로 따르는 것은 일정 수준 이상의 품질을 보장하고, 계획된 비용 내에서 소프트웨어를 개발할 수 있게 하기 때문이다. 이를 통해 소프트웨어의 품질, 비용, 일정 등을 효과적으로 관리할 수 있다."
            },
            {
                "문제유형": "서술형",
                "질문": "소프트웨어 공학에서 Verification과 Validation의 차이점을 설명하시오.",
                "정답": "Verification은 설계한 대로 소프트웨어가 잘 만들어졌는지를 확인하는 과정이고, Validation은 사용자의 요구사항에 맞게 소프트웨어가 잘 동작하는지를 확인하는 과정이다. Verification은 주로 내부적인 설계 검증에 초점을 맞추고, Validation은 외부적인 사용자 요구사항 검증에 초점을 맞춘다."
            },
            {
                "문제유형": "서술형",
                "질문": "소프트웨어 공학에서 매트릭스를 사용하여 프로젝트를 관리하는 방법에 대해 설명하시오.",
                "정답": "매트릭스는 프로젝트의 각 단계가 잘 진행되고 있는지, 완료되었는지를 객관적으로 평가하기 위한 기준이다. 예를 들어, 요구사항 분석 단계가 완료되었는지 평가하기 위해 특정 매트릭스를 사용하고, 그 기준을 충족하면 다음 단계로 넘어간다. 이를 통해 프로젝트 관리자는 각 단계의 진행 상황을 명확하게 파악하고, 적절한 의사결정을 내릴 수 있다."
            }
        ]
        for (const quiz of result) {
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