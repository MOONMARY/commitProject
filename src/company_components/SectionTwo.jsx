import styled from "styled-components";
import CEOImage from "../images/ceo2.jpg"; // ✅ 대표 이미지 import

// ✅ 섹션 전체 스타일
const Section = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10%; /* 📌 좌우 여백 추가 */
  gap: 50px; /* 📌 이미지와 텍스트 사이 여백 조정 */
`;

// ✅ 텍스트 영역
const TextContainer = styled.div`
  width: 50%;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  line-height: 1.6;
  text-align: left;
`;

// ✅ 제목 스타일
const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #d9534f;
  margin-bottom: 15px;
`;

// ✅ 포인트 리스트 스타일
const PointList = styled.ul`
  margin-top: 20px;
  padding-left: 20px;
  list-style: none;
`;

const PointItem = styled.li`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  position: relative;

  &::before {
    content: "🔹";
    position: absolute;
    left: -25px;
    color: #d9534f; /* 포인트 컬러 */
    font-size: 20px;
  }
`;

// ✅ 이미지 컨테이너
const ImageContainer = styled.div`
  width: 40%; 
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 150px; /* 📌 기존보다 간격 줄임 */
`;

// ✅ 대표 이미지 스타일
const StyledImage = styled.img`
  width: 100%;
  max-width: 450px; /* 📌 최대 크기 제한 */
  height: auto;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
`;

function SectionTwo() {
  return (
    <Section>
      {/* ✅ 왼쪽 인사말 추가 */}
      <TextContainer>
        <Title>대표 인사말</Title>
        <p>
          안녕하세요. <strong>결혼 정보 회사 COMMIT</strong> 대표이사 <strong> 복채리 </strong>입니다.
          <br /><br />
          <strong>COMMIT</strong>는 ‘책임지다, 헌신하다’라는 의미를 가진 단어입니다. 저희는 고객 한 분 한 분의 
          <strong> 소중한 인연을 끝까지 책임지고, 최상의 결실을 맺을 수 있도록 헌신하는 기업</strong>이 되고자 합니다.
          <br /><br />
          <strong>좋은 인연은 노력에서 시작됩니다.</strong> 
          COMMIT는 여러분이 평생을 함께할 단 한 사람과의 <strong>소중한 인연</strong>을 맺을 수 있도록 
          <strong> 정직하고 진정성 있는 서비스</strong>를 제공하겠습니다.
          <br /><br />
          <strong>(주) COMMIT 대표이사 [복채리]</strong>
        </p>

        {/* ✅ 3가지 핵심 포인트 추가 */}
        <PointList>
          <PointItem>고객과의 신뢰를 최우선으로 하는 맞춤형 매칭 시스템</PointItem>
          <PointItem>20년 이상 경력의 결혼 전문가들이 함께하는 1:1 컨설팅</PointItem>
          <PointItem>성혼 이후에도 지속적인 관리와 상담을 통한 만족도 극대화</PointItem>
        </PointList>
      </TextContainer>

      {/* ✅ 오른쪽 대표 이미지 */}
      <ImageContainer>
        <StyledImage src={CEOImage} alt="COMMIT 대표" />
      </ImageContainer>
    </Section>
  );
}

export default SectionTwo;
