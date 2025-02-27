import styled from "styled-components";

const Button = styled.button`
@font-face {
    font-family: "MapoPeacefull";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
    
  }

  font-family: "MapoPeacefull";
  width: 100px;
  height: 40px;
  font-size: 1rem;
  font-weight: bold;
  color: #9ac4d8; /* 기본 텍스트 색 */
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
    background: #9ac4d8;
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
    color: #9ac4d8;
  }
`;

function FamilyButton({ text, onClick }) {
  return (
    <Button onClick={onClick}>
      <span>{text}</span>
    </Button>
  );
}
export default FamilyButton;
