import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import photo1 from "../images/path-to-photo1.jpg";
import photo2 from "../images/path-to-photo2.jpg";
import photo3 from "../images/path-to-photo3.jpg";
import photo4 from "../images/path-to-photo4.jpg";
import photo5 from "../images/path-to-photo5.jpg";
import photo6 from "../images/path-to-photo6.jpg";
import photo7 from "../images/path-to-photo7.jpg";
import photo8 from "../images/path-to-photo8.jpg";
import photo9 from "../images/path-to-photo9.jpg";
import photo10 from "../images/path-to-photo10.jpg";
import photo11 from "../images/path-to-photo11.jpg";
import photo12 from "../images/path-to-photo12.jpg";
import photo13 from "../images/path-to-photo13.jpg";
import photo14 from "../images/path-to-photo14.jpg";
import photo15 from "../images/path-to-photo15.jpg";

const imagesSet = [
  [photo1, photo2, photo3, photo4, photo5, photo6, photo14, photo15],
  [photo7, photo8, photo9, photo10, photo11, photo12, photo13]
];

// ✅ 전체 컨테이너 (웨딩 포토 슬라이드는 가운데 고정)
const BackgroundContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100vw;
  height: 800px;
  overflow: hidden;
  padding: 50px 5%;
  box-sizing: border-box;
`;

// ✅ 왼쪽 텍스트 컨테이너 (애니메이션 추가)
const TextContainer = styled.div`
@font-face {
    font-family: 'GapyeongHanseokbong-Bold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/GapyeongHanseokbong-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}

@font-face {
    font-family: 'HSBombaram';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/HSBombaram.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'OG_Renaissance_Secret-Rg';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/OG_Renaissance_Secret-Rg.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

  flex: 1;
  display: flex; /* ✅ Flexbox 사용 */
  flex-direction: column; /* ✅ 세로 정렬 */
  justify-content: center; /* ✅ 수직 가운데 정렬 */
  align-items: center; /* ✅ 수평 가운데 정렬 */
  text-align: center; /* ✅ 내부 텍스트 정렬 */
  font-size: 52px;
  font-weight: bold;
  // color: #333;
  color: #53279b;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: scale(${({ isVisible }) => (isVisible ? 1 : 0.9)});
  transition: opacity 1s ease-out, transform 1s ease-out;
  margin-right: 54px;
  font-family: 'OG_Renaissance_Secret-Rg';
  line-height: 3; /* ✅ 줄 간격 조절 */

  /* ✅ 빛이 스쳐 지나가는 효과 */
  position: relative;
  overflow: hidden;
  white-space: nowrap;

  &::after { 
    content: "";
    position: absolute;
    top: 0;
    left: -100%; /* 처음에는 왼쪽 바깥에 위치 */
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    animation: highlight 3s infinite linear; /* ✅ 3초마다 반복 */
  }

  @keyframes highlight { /* ✅ 빛이 지나가는 애니메이션 */
    0% { left: -100%; }
    100% { left: 100%; }
  }

  /* ✅ 부드러운 흔들림 효과 */
  animation: softShake 6s infinite ease-in-out;

  @keyframes softShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-1px); }
    50% { transform: translateX(1px); }
    75% { transform: translateX(-0.5px); }
  }
`;

// ✅ 버튼 컨테이너 (대각선 배치)
const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 50px 120px;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-left: 40px; /* ✅ 웨딩 포토와의 간격 조정 */
  padding-right: 90px; /* ✅ 오른쪽 여백 추가 */
  max-width: 400px; /* ✅ 버튼 컨테이너 크기 제한 */
  transform: translateY(20px);
  position: relative;
`;

// ✅ 기존 버튼 스타일
const PositionedButton = styled.button`
@font-face {
    font-family: 'OG_Renaissance_Secret-Rg';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/OG_Renaissance_Secret-Rg.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

  width: 140px;
  height: 160px;
  border: 2px solid #ffffff;
  background-color: white;
  color: #53279b;
  font-size: 34px;
  font-weight: bold;
  // border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
  z-index: 10;
  font-family: 'OG_Renaissance_Secret-Rg';

  &:hover {
    transform: scale(1.1);
    background-color: #d5cde2;
  }
`;

// ✅ 버튼 개별 위치 조정
const Button1 = styled(PositionedButton)`
  justify-self: start;
  margin-bottom: 150px;
`;

const Button2 = styled(PositionedButton)`
  justify-self: end;
  margin-bottom: 50px;
  margin-top: 55px;
`;

const Button3 = styled(PositionedButton)`
  // justify-self: center;
  // transform: translateX(70px);
  margin-bottom: 150px;
`;

const Button4 = styled(PositionedButton)`
  // justify-self: center;
  // transform: translateX(70px);
  margin-top: 55px;
`;

// ✅ 슬라이드 컨테이너 (웨딩 포토 위치 고정)
const SliderContainer = styled.div`
  width: 240px;
  overflow: hidden;
  position: relative;
  height: 100%;
`;

// ✅ 슬라이드 래퍼
const SlidesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  transform: translateY(${(props) => props.translateValue}px);
  transition: none;
`;

// ✅ 이미지 크기
const SlideImage = styled.img`
  width: 230px;
  height: 250px;
  object-fit: cover;
  flex-shrink: 0;
`;

function PhotoGallery() {
  const sliderRefs = useRef([]);
  const [translateY, setTranslateY] = useState(imagesSet.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);

  // ✅ 스크롤 감지해서 텍스트 애니메이션 활성화
  useEffect(() => {
    const handleScroll = () => {
      const sectionTop = document.getElementById("photo-gallery").offsetTop;
      const scrollPosition = window.scrollY + window.innerHeight;
      setIsVisible(scrollPosition > sectionTop + 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const speeds = imagesSet.map(() => Math.random() * 0.8 + 0.5);
    const animations = imagesSet.map((_, index) => {
      let animationFrame;

      const moveSlider = () => {
        setTranslateY((prev) => {
          const newValues = [...prev];
          const slider = sliderRefs.current[index];

          if (slider) {
            const scrollHeight = slider.scrollHeight / 2;

            if (newValues[index] <= -scrollHeight) {
              newValues[index] = 0;
            } else {
              newValues[index] -= speeds[index];
            }
          }
          return newValues;
        });
        animationFrame = requestAnimationFrame(moveSlider);
      };

      animationFrame = requestAnimationFrame(moveSlider);
      return () => cancelAnimationFrame(animationFrame);
    });

    return () => animations.forEach((cancel) => cancel());
  }, []);

  return (
    <BackgroundContainer id="photo-gallery">
      {/* ✅ 왼쪽 문구 */}
      <TextContainer isVisible={isVisible}>
        아직 만나지 못한 <br /> 나의 반쪽을 <br /> 만나고 싶다면
      </TextContainer>

      {/* ✅ 가운데 웨딩 포토 (슬라이드) */}
      {imagesSet.map((imageArray, i) => (
        <SliderContainer key={i} ref={(el) => (sliderRefs.current[i] = el)}>
          <SlidesWrapper translateValue={translateY[i]}>
            {Array(2)
              .fill(imageArray)
              .flat()
              .map((src, index) => (
                <SlideImage key={index} src={src} alt={`사진 ${index + 1}`} />
              ))}
          </SlidesWrapper>
        </SliderContainer>
      ))}

      
  <ButtonContainer>
        <Button1>초혼</Button1>
        <Button2>재혼</Button2>
        <Button3>프리미어</Button3>
        <Button4>하이엔드</Button4>
      </ButtonContainer>
      
    </BackgroundContainer>
  );
}

export default PhotoGallery;



















// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";
// import photo1 from "../images/path-to-photo1.jpg";
// import photo2 from "../images/path-to-photo2.jpg";
// import photo3 from "../images/path-to-photo3.jpg";
// import photo4 from "../images/path-to-photo4.jpg";
// import photo5 from "../images/path-to-photo5.jpg";
// import photo6 from "../images/path-to-photo6.jpg";
// import photo7 from "../images/path-to-photo7.jpg";
// import photo8 from "../images/path-to-photo8.jpg";
// import photo9 from "../images/path-to-photo9.jpg";
// import photo10 from "../images/path-to-photo10.jpg";
// import photo11 from "../images/path-to-photo11.jpg";
// import photo12 from "../images/path-to-photo12.jpg";
// import photo13 from "../images/path-to-photo13.jpg";
// import photo14 from "../images/path-to-photo14.jpg";
// import photo15 from "../images/path-to-photo15.jpg";

// // ✅ 각 줄마다 개별적으로 반복할 이미지 배열
// const imagesSet = [
//   [photo1, photo2, photo3, photo4, photo5, photo6, photo14, photo15],
//   [photo7, photo8, photo9, photo10, photo11, photo12, photo13]
// ];

// // ✅ 중앙 정렬 및 여백 균등
// const BackgroundContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 20px;
//   width: 100vw;
//   height: 800px; /* ✅ 기존 높이 유지 */
//   overflow: hidden;
//   padding: 50px 0;
//   box-sizing: border-box;
//   position: relative;
// `;

// // ✅ 버튼 스타일
// const PositionedButton = styled.button`
//   position: absolute;
//   width: 150px;
//   height: 150px;
//   border: 2px solid #2196f3;
//   background-color: white;
//   color: #2196f3;
//   font-size: 20px;
//   font-weight: bold;
//   border-radius: 8px;
//   cursor: pointer;
//   transition: transform 0.2s;
//   z-index: 10;

//   &:hover {
//     transform: scale(1.1);
//     background-color: #e3f2fd;
//   }
// `;

// // ✅ 각 버튼의 위치를 설정
// const Button1 = styled(PositionedButton)`
//   top: 20%;
//   left: 5%;
// `;

// const Button2 = styled(PositionedButton)`
//   top: 60%;
//   left: 5%;
// `;

// const Button3 = styled(PositionedButton)`
//   top: 20%;
//   right: 5%;
// `;

// const Button4 = styled(PositionedButton)`
//   top: 60%;
//   right: 5%;
// `;

// // ✅ 슬라이드 컨테이너 고정 너비
// const SliderContainer = styled.div`
//   width: 240px;
//   overflow: hidden;
//   position: relative;
//   height: 100%;
// `;

// // ✅ 슬라이드 래퍼
// const SlidesWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   transform: translateY(${(props) => props.translateValue}px);
//   transition: none;
// `;

// // ✅ 이미지 크기 키우기
// const SlideImage = styled.img`
//   width: 230px;
//   height: 250px;
//   object-fit: cover;
//   flex-shrink: 0;
// `;

// function PhotoGallery() {
//   const sliderRefs = useRef([]);
//   const [translateY, setTranslateY] = useState(imagesSet.map(() => 0));

//   useEffect(() => {
//     const speeds = imagesSet.map(() => Math.random() * 0.8 + 0.5);

//     const animations = imagesSet.map((_, index) => {
//       let animationFrame;

//       const moveSlider = () => {
//         setTranslateY((prev) => {
//           const newValues = [...prev];
//           const slider = sliderRefs.current[index];

//           if (slider) {
//             const scrollHeight = slider.scrollHeight / 2;

//             if (newValues[index] <= -scrollHeight) {
//               newValues[index] = 0;
//             } else {
//               newValues[index] -= speeds[index];
//             }
//           }
//           return newValues;
//         });
//         animationFrame = requestAnimationFrame(moveSlider);
//       };

//       animationFrame = requestAnimationFrame(moveSlider);
//       return () => cancelAnimationFrame(animationFrame);
//     });

//     return () => animations.forEach((cancel) => cancel());
//   }, []);

//   return (
//     <BackgroundContainer>
//       {/* ✅ 대각선 배치 버튼 */}
//       <Button1>초혼</Button1>
//       <Button2>재혼</Button2>
//       <Button3>프리미어</Button3>
//       <Button4>하이엔드</Button4>

//       {/* ✅ 이미지 슬라이더 */}
//       {imagesSet.map((imageArray, i) => (
//         <SliderContainer key={i} ref={(el) => (sliderRefs.current[i] = el)}>
//           <SlidesWrapper translateValue={translateY[i]}>
//             {Array(2)
//               .fill(imageArray)
//               .flat()
//               .map((src, index) => (
//                 <SlideImage key={index} src={src} alt={`사진 ${index + 1}`} />
//               ))}
//           </SlidesWrapper>
//         </SliderContainer>
//       ))}
//     </BackgroundContainer>
//   );
// }

// export default PhotoGallery;
