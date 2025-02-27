import { useState } from "react";
import styled, { keyframes } from "styled-components";

// ✅ 배경 애니메이션 정의
const animatedGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  margin-bottom: 30px;
`;

const QuestionText = styled.h2`
  @font-face {
      font-family: 'HakgyoansimDunggeunmisoTTF-B';
      src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimDunggeunmisoTTF-B.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
  }
  font-family: 'HakgyoansimDunggeunmisoTTF-B';
  font-size: 2.1rem;
  margin-bottom: 50px;
  margin-top: 50px;

  /* ✅ 핑크 & 하늘색 애니메이션 적용 */
  background: linear-gradient(90deg, #ff7eb3, #87cefa, #ff7eb3, #87cefa);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${animatedGradient} 6s linear infinite;
`;

const OptionButton = styled.button`
  @font-face {
      font-family: 'HakgyoansimDunggeunmisoTTF-B';
      src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimDunggeunmisoTTF-B.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
  }
  font-family: 'HakgyoansimDunggeunmisoTTF-B';

  width:300px;
  height: 80px;
  padding: 10px;
  margin: 5px;
  font-size: 1.2rem;
  background-color: #f2f2f2;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  color:#8073fc;


  /* ✅ 핑크 & 하늘색 그라디언트 */
  background: linear-gradient(90deg, #ffcae0, #c8eaff, #ffcae0, #c8eaff);
  background-size: 200% auto;
  animation: ${animatedGradient} 6s linear infinite;


  &:hover {
    background-color: #d99696;
    color: #000000;
  }
`;



function TestQuestion({ setStep, score, setScore }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  // const [score, setScore] = useState(0);
  // const [resultText, setResultText] = useState("");

  
  const questions = [
    {
      question: "연애 스타일을 선택하세요",
      options: [
        { answer: "리드하는 스타일", score: 5 },
        { answer: "따르는 스타일", score: 3 }
      ]
    },
    {
      question: "대화 방식은 어떤가요?",
      options: [
        { answer: "먼저 주도하는 스타일", score: 5 },
        { answer: "경청하는 스타일", score: 3 }
      ]
    },
    {
      question: "데이트는 집에서? 밖에서?",
      options: [
        { answer: "집 데이트가 재밌지", score: 3 },
        { answer: "야외 데이트가 재밌지", score: 5 }
      ]
    },
    {
      question: "너는 어떤 사람인가요?",
      options: [
        { answer: "자유로운 사람", score: 4 },
        { answer: "책임감 있는 사람", score: 4 }
      ]
    },
    {
      question: "연애에서 가장 중요하게 생각하는 것은?",
      options: [
        { answer: "정확한 의사소통", score: 5 },
        { answer: "상대방의 자유 존중", score: 3 }
      ]
    },
    {
      question: "갈등이 생기면 어떻게 할까요?",
      options: [
        { answer: "즉각적으로 대화로 풀려고 한다", score: 5 },
        { answer: "시간을 두고 생각한다", score: 3 }
      ]
    },
    {
      question: "데이트에서 주로 어떤 활동을 선호하나요?",
      options: [
        { answer: "활동적인 데이트", score: 5 },
        { answer: "편안한 분위기에서의 데이트", score: 3 }
      ]
    },
    {
      question: "상대방의 어떤 점을 가장 중요하게 생각하나요?",
      options: [
        { answer: "성격과 내면의 가치", score: 5 },
        { answer: "외모", score: 3 }
      ]
    },
    {
      question: "연애 초기, 상대에게 가장 중요한 것은?",
      options: [
        { answer: "솔직한 대화", score: 5 },
        { answer: "편안한 거리감", score: 3 }
      ]
    },
    {
      question: "연애에서 상대방의 바람을 알게 되었을 때, 어떻게 할까요?",
      options: [
        { answer: "즉각적으로 대화하고 문제를 해결한다", score: 5 },
        { answer: "상황을 지켜보며 판단한다", score: 3 }
      ]
    },
    {
        question: "데이트 중 상대방이 바쁘면 어떻게 행동하나요?",
        options: [
          { answer: "그 사람의 일정을 존중하며 기다린다", score: 5 },
          { answer: "조금 불편해도 자주 연락한다", score: 3 }
        ]
      },
      {
        question: "연애에서 어떤 방식으로 사랑을 표현하나요?",
        options: [
          { answer: "자주 말로 표현한다", score: 5 },
          { answer: "행동으로 표현한다", score: 3 }
        ]
      },
      {
        question: "연애에서 중요한 것은 무엇인가요?",
        options: [
          { answer: "서로의 가치관이 맞는지", score: 5 },
          { answer: "서로의 외모와 매력", score: 3 }
        ]
      },
      {
        question: "질문 고갈입니다",
        options: [
          { answer: "후", score: 5 },
          { answer: "음", score: 3 }
        ]
      },
      {
        question: "돈이냐 사랑이냐",
        options: [
          { answer: "돈", score: 5 },
          { answer: "사랑", score: 3 }
        ]
      }
  ];

  const handleAnswer = (optionScore) => {
    //setScore(score + optionScore); // 점수 누적
    setScore(prevScore => prevScore + optionScore); // 부모 state 업데이트
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setStep("result"); // 마지막 질문에서 결과로 이동
    }
  };

  return (
    <Container>
      <QuestionText>{questions[questionIndex].question}</QuestionText>
      {questions[questionIndex].options.map((option, index) => (
        <OptionButton key={index} onClick={() => handleAnswer(option.score)}>
          {option.answer}
        </OptionButton>
      ))}
    </Container>
  );
}

export default TestQuestion;
