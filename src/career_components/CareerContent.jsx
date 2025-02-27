import styled from "styled-components";
import ContentBox from "./ContentBox";

import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import CareerButton from "./CareerButton";

const Container = styled.div`
  width: 94.15rem;
  height: 40rem;
  // border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Box = styled.div`
  width: 85rem;
  height: 3rem;
  // border: 2px solid black;
  display: flex;
  // justify-content: end;
  justify-content: flex-end;
  margin-top: 1rem;
  gap: 50px; // 버튼 사이 간격 조정
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  font-size: 1rem;
  font-weight: bold;
  color: #959595; /* 기본 텍스트 색 */
  background: #ffffff;
  border: none;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  border-radius: 5px;

  margin-bottom: 100px;
  margin-top: 30px;

  display: inline-block; /* 버튼을 인라인 블록 요소로 설정하여 가로 정렬 가능하게 만듦 */
  margin-left: 15px; /* 버튼 간격 조절 */
  margin-right: 15px;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: -100%;
    background: #959595;
    transition: left 0.3s ease-in-out;
  }

  &:hover::after {
    left: 0; /* 왼쪽에서 오른쪽으로 채워짐 */
  }

  /* ✅ 폰트 색상 유지 */
  span {
    position: relative;
    z-index: 2;
    transition: color 0.3s ease-in-out;
  }

  /* ✅ 배경색이 채워질 때 흰색으로 변경 */
  &:hover span {
    color: white;
  }

  /* ✅ 백그라운드 색이 사라지면 원래 색으로 복귀 */
  &:not(:hover) span {
    color: #959595;
  }
`;

function CareerContent({ ControllModal, career }) {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <TopBar title={"직업 정보"} />
        <ContentBox career={career} />
        <Box>
          <CareerButton onClick={() => ControllModal()} text={"수정하기"} />
          <CareerButton onClick={() => navigate("/MyPage")} text={"뒤로가기"} />
        </Box>
      </Container>
    </>
  );
}
export default CareerContent;
