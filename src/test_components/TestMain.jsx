import styled, { keyframes } from "styled-components"; // ✅ keyframes 추가

// ✅ 배경 애니메이션 정의 (움직이는 효과)
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
`;

// ✅ 텍스트 효과가 적용된 Title 컴포넌트
const Title = styled.h1`

@font-face {
    font-family: 'PyeongChangPeace-Bold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/PyeongChangPeace-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}
font-family: 'PyeongChangPeace-Bold';
  font-size: 4rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
  padding: 0.5em 0;
  display: inline-block;
  border: 4px double rgba(255, 255, 255, 0.25);
  border-width: 4px 0;
  width: 40em;
  position: relative;
  color: rgba(255, 255, 255, 0.25);

  /* ✅ 핑크 & 하늘색 그라디언트 적용 */
  background: linear-gradient(90deg, #ff7eb3, #87cefa, #ff7eb3,#87cefa);
  background-size: 200% auto; /* ✅ 색이 자연스럽게 흐르게 */
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* ✅ 애니메이션 적용 */
  animation: ${animatedGradient} 6s linear infinite;
`;

const StartButton = styled.button`

@font-face {
    font-family: 'PyeongChangPeace-Bold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/PyeongChangPeace-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}
font-family: 'PyeongChangPeace-Bold';
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 25px;
  background-color: #d99696;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;

  /* ✅ 핑크 & 하늘색 그라디언트 적용 */
  background: linear-gradient(90deg, #ff7eb3, #87cefa, #ff7eb3,#87cefa);
  background-size: 200% auto; /* ✅ 색이 자연스럽게 흐르게 */
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* ✅ 애니메이션 적용 */
  animation: ${animatedGradient} 6s linear infinite;

  &:hover {
    background-color: #c06c6c;
  }
`;

function TestMain({ setStep }) {
  return (
    <Container>
      <Title>연애 유형 테스트</Title>
      <StartButton onClick={() => setStep("question")}>시작하기</StartButton>
    </Container>
  );
}

export default TestMain;





// import styled from "styled-components";


// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 80vh;
// `;

// const Title = styled.h1`
//   font-size: 2rem;
//   color: #d99696;
// `;

// const StartButton = styled.button`
//   margin-top: 20px;
//   padding: 10px 20px;
//   font-size: 1.2rem;
//   background-color: #d99696;
//   color: white;
//   border: none;
//   cursor: pointer;
//   border-radius: 5px;

//   &:hover {
//     background-color: #c06c6c;
//   }
// `;

// function TestMain({ setStep }) {
//   return (
//     <Container>
//       <Title>연애 유형 테스트</Title>
//       <StartButton onClick={() => setStep("question")}>시작하기</StartButton>
//     </Container>
//   );
// }

// export default TestMain;
