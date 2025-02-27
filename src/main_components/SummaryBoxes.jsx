import { useEffect, useState, useRef } from "react";
import styled, { keyframes, css } from "styled-components";

// ✅ 내려오는 애니메이션
const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-80px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// ✅ 정적 데이터 박스 컨테이너
const SummaryBoxContainer = styled.div`
  display: flex;
  justify-content: center;  /* 가운데 정렬 */
  gap: 20px;  /* ✅ 박스 간격 조절 */
  margin-bottom: 20px;

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${fadeInDown} 1.5s ease-out;
    `}
`;

const SummaryBox = styled.div`
  width: 300px;
  height: 120px;
  background: rgb(255, 222, 222);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin: 100px 10px;
  opacity: 0;
  transform: translateY(-80px);

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      opacity: 1;
      transform: translateY(0);
      transition: opacity 1.5s ease-out, transform 1.5s ease-out;
    `}
`;

const SummaryTitle = styled.h3`
  
  font-size: 16px;
  color: rgb(199, 81, 81);
  margin-bottom: 5px;
`;

const SummaryNumber = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: rgb(255, 0, 81);
`;

const SummaryUnit = styled.span`
  font-size: 18px;
  color: rgb(255, 0, 81);
`;

function SummaryBoxes() {
  const [isVisible, setIsVisible] = useState(false);
  const summaryRef = useRef(null);
  const [counts, setCounts] = useState({
    totalCouples: 0,
    upcomingMarriages: 0,
    marriedCouples: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (summaryRef.current) {
      observer.observe(summaryRef.current);
    }

    return () => {
      if (summaryRef.current) {
        observer.unobserve(summaryRef.current);
      }
    };
  }, []);

  // ✅ 숫자 카운트업 기능
  useEffect(() => {
    if (isVisible) {
      let total = 50988;
      let upcoming = 1516;
      let married = 24972;
      let duration = 2200; // 1.5초 동안 증가

      let stepTime = duration / total;

      let intervalTotal = setInterval(() => {
        setCounts((prev) => ({
          ...prev,
          totalCouples: prev.totalCouples < total ? prev.totalCouples + 200 : total,
        }));
      }, stepTime * 200);

      let intervalUpcoming = setInterval(() => {
        setCounts((prev) => ({
          ...prev,
          upcomingMarriages: prev.upcomingMarriages < upcoming ? prev.upcomingMarriages + 10 : upcoming,
        }));
      }, stepTime * 200);

      let intervalMarried = setInterval(() => {
        setCounts((prev) => ({
          ...prev,
          marriedCouples: prev.marriedCouples < married ? prev.marriedCouples + 200 : married,
        }));
      }, stepTime * 200);

      setTimeout(() => {
        clearInterval(intervalTotal);
        clearInterval(intervalUpcoming);
        clearInterval(intervalMarried);
      }, duration);
    }
  }, [isVisible]);

  return (
    <SummaryBoxContainer ref={summaryRef} $isVisible={isVisible}>
      <SummaryBox $isVisible={isVisible}>
        <SummaryTitle>COMMIT 총 성혼커플수</SummaryTitle>
        <SummaryNumber>{counts.totalCouples.toLocaleString()}</SummaryNumber>
        <SummaryUnit>명</SummaryUnit>
      </SummaryBox>
      <SummaryBox $isVisible={isVisible}>
        <SummaryTitle>결혼예정인 성혼커플수</SummaryTitle>
        <SummaryNumber>{counts.upcomingMarriages.toLocaleString()}</SummaryNumber>
        <SummaryUnit>명</SummaryUnit>
      </SummaryBox>
      <SummaryBox $isVisible={isVisible}>
        <SummaryTitle>매칭 진행 중인 커플 수</SummaryTitle>
        <SummaryNumber>{counts.marriedCouples.toLocaleString()}</SummaryNumber>
        <SummaryUnit>명</SummaryUnit>
      </SummaryBox>
    </SummaryBoxContainer>
  );
}

export default SummaryBoxes;
