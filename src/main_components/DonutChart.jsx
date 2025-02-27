import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import bgImage from "../images/34696_large.webp"; // ✅ 배경 이미지 불러오기

// ✅ 데이터 정의
const data = [
  { name: "대기업", value: 20, color: "#244BBF" },
  { name: "외국계 및 글로벌", value: 15, color: "#F2809F" },
  { name: "교육계 및 기타", value: 12, color: "#85BFF2" },
  { name: "금융계", value: 10, color: "#F2EFBD" },
  { name: "사업가", value: 18, color: "#8857F2" },
  { name: "의료계", value: 15, color: "#F2BDC7" },
  { name: "법조계", value: 10, color: "#03A696" }
];

// ✅ 스타일드 컴포넌트 정의
const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  width: 100%;
  margin: 30px auto;
  padding: 50px;
  
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  /* ✅ 배경 투명도 조절 */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(230, 230, 230, 0.4);
    z-index: 1;
  }
`;

// ✅ 문구 컨테이너 (왼쪽) → flex 비율 조정 및 margin 수정
const TextContainer = styled.div`
  flex: 1.2;
  font-size: 24px;
  font-weight: bold;
  color: #4E52A6;
  padding: 20px;
  position: relative;
  z-index: 2;
  margin-right: 100px;
  padding-left: 80px; 
`;

// ✅ 차트 컨테이너 (오른쪽) → flex 비율 조정 및 margin 수정
const ChartContainer = styled.div`
  flex: 1;
  max-width: 700px;
  position: relative;
  z-index: 2;
  margin-left: 100px; 
  margin-right: 180px;
`;

const CenterText = styled.div`
  @font-face {
     font-family: 'KOMACON';
     src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.2/KOMACON.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}

  font-family: 'KOMACON';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;
  font-weight: bold;
  color: #0D0D0D;
`;

const StyledLabel = styled.text`

@font-face {
     font-family: 'KOMACON';
     src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.2/KOMACON.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}

font-family: 'KOMACON';
  font-size: 17px;
  font-weight: bold;
  text-anchor: middle;
  fill: #0D0D0D;
`;

const Title = styled.h2`
  @font-face {
    font-family: 'Binggrae-Two';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/Binggrae-Bold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
font-family: 'Binggrae-Two';
  font-size: 38px;
  font-weight: bold;
  color: #0D0D0D;
  margin-bottom: 10px;
`;

const Description = styled.p`
  @font-face {
    font-family: 'TTWanjunuricheR';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/TTWanjunuricheR.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
font-family: 'TTWanjunuricheR';
  font-size: 18px;
  color: #0D0D0D;
  line-height: 1.6;
`;

// ✅ 커스텀 라벨 함수 (차트 바깥에 배치)
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return <StyledLabel x={x} y={y}>{name}</StyledLabel>;
};

function DonutChart() {
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    if (chartRef.current) {
      observer.observe(chartRef.current);
    }
    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, []);

  return (
    <Container>
      {/* ✅ 왼쪽 문구 */}
      <TextContainer>
        <Title>COMMIT을 선택한 다양한 회원</Title>
        <Description>
          100대 대기업, 상장기업, 외국계 기업, 공공기관 종사자 등
          <br />
          다양한 직업 분야 회원과 만남 가능
        </Description>
      </TextContainer>

      {/* ✅ 오른쪽 차트 */}
      <ChartContainer ref={chartRef}>
        <CenterText>회원현황</CenterText>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={150}
              paddingAngle={2}
              dataKey="value"
              label={renderCustomizedLabel}
              labelLine={false}
              isAnimationActive={isVisible} // ✅ 스크롤 되면 애니메이션 실행
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Container>
  );
}

export default DonutChart;
