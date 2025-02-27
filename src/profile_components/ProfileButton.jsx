import styled from "styled-components";

const Button = styled.button`
  width: 100px;
  height: 40px;
  font-size: 1rem;
  font-weight: bold;
  color: #a188ce; /* 기본 텍스트 색 */
  background: #ffffff;
  border: none;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  border-radius: 5px;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: -100%;
    background: #a188ce;
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
    color: #a188ce;
  }
`;

function ProfileButton({ text, onClick }) {
  return (
    <Button onClick={onClick}>
      <span>{text}</span>
    </Button>
  );
}
export default ProfileButton;
