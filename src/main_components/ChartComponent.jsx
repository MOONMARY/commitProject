import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";

// ✅ 연도별 성혼 성사율 데이터 (초기값 0, 이후 애니메이션 적용)
const initialData = [
  { year: "2021", 남성: 0, 여성: 0 },
  { year: "2022", 남성: 0, 여성: 0 },
  { year: "2023", 남성: 0, 여성: 0 },
  { year: "2024", 남성: 0, 여성: 0 } 
];

const finalData = [
  { year: "2021", 남성: 27, 여성: 34 },
  { year: "2022", 남성: 42, 여성: 40 },
  { year: "2023", 남성: 57, 여성: 64 },
  { year: "2024", 남성: 85, 여성: 82 } 
];

// ✅ 전체 레이아웃 (차트 + 텍스트 + 버튼)
const ChartSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1300px;
  margin: 10px auto;
  gap: 100px;
`;

// ✅ 차트 컨테이너 (왼쪽 정렬, 크기 조정)
const ChartWrapper = styled.div`
  width: 65%;
  min-height: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: -124px;
`;

// ✅ 차트 제목 스타일
const ChartTitle = styled.div`
  @font-face {
    font-family: 'TheJamsil5Bold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}

font-family: 'TheJamsil5Bold';
  font-size: 33px;
  font-weight: bold;
  color: #D9534F;
  margin-bottom: 10px;
  text-align: center;
`;

// ✅ 오른쪽 텍스트 & 버튼 컨테이너
const InfoContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
`;

// ✅ 제목 스타일
const InfoTitle = styled.h2`
  @font-face {
      font-family: 'SUNMOONUNIVERSITY';
      src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/SUNMOONUNIVERSITY.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
  }

  font-family: 'SUNMOONUNIVERSITY';
  font-size: 40px;
  color: #D9534F;
  margin-bottom: 15px;
`;

// ✅ 설명 스타일
const InfoText = styled.p`
  @font-face {
      font-family: 'SUNMOONUNIVERSITY';
      src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/SUNMOONUNIVERSITY.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
  }

  font-family: 'SUNMOONUNIVERSITY';
  font-size: 19px;
  color: #333;
  margin-bottom: 25px;
`;

// ✅ 버튼 스타일
const InfoButton = styled.button`
  @font-face {
      font-family: 'SUNMOONUNIVERSITY';
      src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/SUNMOONUNIVERSITY.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
  }

  font-family: 'SUNMOONUNIVERSITY';
  width: 340px;
  height: 80px;
  padding: 12px 18px;
  font-size: 19px;
  color: white;
  background-color: #f0726e;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 12px;
  transition: background 0.3s;

  &:hover {
    background-color: #C9302C;
  }
`;

function ChartComponent() {
  const [chartData, setChartData] = useState(initialData);
  const chartRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false); // 애니메이션 실행 여부 확인

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateChart();
        }
      },
      { threshold: 0.5 } // 50% 이상 보이면 실행
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, [hasAnimated]);

  const animateChart = () => {
    let progress = 0;
    const duration = 1000; // 애니메이션 지속 시간 (1초)
    const interval = 20; // 프레임 간격 (20ms)
    const steps = duration / interval;
    
    const animate = setInterval(() => {
      progress += 1;
      if (progress > steps) {
        clearInterval(animate);
        setChartData(finalData); // 최종 데이터 설정
        return;
      }

      // 현재 진행 비율
      const ratio = progress / steps;

      // 비율에 맞춰 점진적으로 데이터 업데이트
      setChartData(finalData.map((d) => ({
        year: d.year,
        남성: Math.round(d.남성 * ratio),
        여성: Math.round(d.여성 * ratio),
      })));
    }, interval);
  };

  return (
    <ChartSection ref={chartRef}>
      {/* ✅ 왼쪽 차트 */}
      <ChartWrapper>
        <ChartTitle>&lt;COMMIT 성혼 달성률&gt;</ChartTitle>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <CartesianGrid stroke="transparent" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="year" type="category" width={100} />
            <Tooltip />
            <Legend />
            <Bar dataKey="남성" fill="#F299B9" barSize={40}>
              <LabelList
                dataKey="남성"
                position="right"
                fill="#D9534F"
                fontSize={16}
                fontWeight="bold"
              />
            </Bar>
            <Bar dataKey="여성" fill="#7673D9" barSize={40}>
              <LabelList
                dataKey="여성"
                position="right"
                fill="#4A90E2"
                fontSize={16}
                fontWeight="bold"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>

      {/* ✅ 오른쪽 문구 & 버튼 */}
      <InfoContainer>
        <InfoTitle>빠른 인연 맺기</InfoTitle>
        <InfoText>가입일로부터 7일 내 만남이 주선됩니다 땡큐죠?</InfoText>
        <InfoButton>바로 상담</InfoButton>
        <InfoButton>매칭 시스템 한 눈에 보기</InfoButton>
      </InfoContainer>
    </ChartSection>
  );
}

export default ChartComponent;
