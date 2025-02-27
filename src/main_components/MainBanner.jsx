import { useEffect, useState, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import banner from "../images/banner.jpeg"; // 로컬 이미지 import

// ✅ 폰트 페이드인 애니메이션
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// ✅ 반딧불이 애니메이션 (랜덤한 위치에서 이동)
const fireflyAnimation = keyframes`
  0% {
    transform: translate(0, 0);
    opacity: 0.8;
  }
  50% {
    transform: translate(-10px, 15px);
    opacity: 1;
  }
  100% {
    transform: translate(10px, -15px);
    opacity: 0.8;
  }
`;


// ✅ 반딧불이 효과 스타일
const Firefly = styled.div`
  position: absolute;
  width: ${({ size }) => size}px; /* 랜덤 크기 */
  height: ${({ size }) => size}px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  filter: blur(2px);
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  animation: ${fireflyAnimation} ${({ duration }) => duration}s infinite alternate ease-in-out;
  opacity: 0.8;
`;

// ✅ 배너 컨테이너
const BannerContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

// ✅ 배경 이미지 배너
const Banner = styled.div`
  width: 100%;
  height: 100%;
  background: url(${banner}) no-repeat center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
`;

// ✅ 애니메이션 적용된 텍스트
const AnimatedText = styled.div`
  @font-face {
    font-family: 'KimjungchulScript-Bold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/KimjungchulScript-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }
    
  font-size: 3rem;
  font-weight: 700;
  font-family: "KimjungchulScript-Bold", "Times New Roman", serif;
  text-align: center;
  margin-top: 400px;

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${fadeIn} 2s ease-in-out;
    `}
`;

function MainBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } // 배너의 50% 이상 보이면 실행
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  // ✅ 반딧불이 개수와 랜덤 위치 설정
  const fireflies = Array.from({ length: 12 }).map((_, index) => ({
    id: index,
    size: Math.random() * 8 + 5, // 크기 (5px ~ 13px)
    top: Math.random() * 90, // 랜덤 위치 (상단 ~ 하단)
    left: Math.random() * 90, // 랜덤 위치 (좌측 ~ 우측)
    duration: Math.random() * 3 + 2, // 애니메이션 속도 (2초 ~ 5초)
  }));

  return (
    <BannerContainer ref={bannerRef}>
      <Banner>
        <AnimatedText $isVisible={isVisible}>당신의 인연을 COMMIT 해드립니다</AnimatedText>
       {/* ✅ 반딧불이 요소 추가 */}
        {fireflies.map((firefly) => (
          <Firefly
            key={firefly.id}
            size={firefly.size}
            top={firefly.top}
            left={firefly.left}
            duration={firefly.duration}
          />
        ))}
      </Banner>
    </BannerContainer>
  );
}
export default MainBanner;
