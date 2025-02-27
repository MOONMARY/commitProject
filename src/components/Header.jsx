import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../images/Logo.png"; // 로컬 이미지 import
import PropTypes from "prop-types"; // PropTypes import

const HeaderContainer = styled.div`
  width: 100%;
  height: 10rem; /* ✅ 기존 크기 유지 (160px) */
  margin: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f2f2f2; /* ✅ 항상 같은 배경 색 유지 */
  border-bottom: 3px solid #d99696; /* ✅ 기존 테두리 유지 */
`;

const LogoButton = styled.button`
  width: 10rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const LogoImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const MenuButton = styled.button`
  @font-face {
    font-family: "Jal_Onuel";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/Jal_Onuel.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  flex: 1;
  height: 100%;
  font-size: 1.2rem;
  font-weight: 600;
  color: #d99696; /* ✅ 기본 색상 유지 */
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  font-family: "Jal_Onuel";

  &:hover {
    background-color: #f28888;
    color: white;
  }
`;

function Header({ userSession, deleteSession }) {
  const navigate = useNavigate();

  let content = null;

  if (userSession === null) {
    content = (
      <MenuButton onClick={() => navigate("/SignIn")}>로그인</MenuButton>
    );
  } else {
    content = <MenuButton onClick={() => deleteSession()}>로그아웃</MenuButton>;
  }
  const isAdmin = userSession && userSession.member === "admin";

  return (
    <HeaderContainer>
      <LogoButton onClick={() => navigate("/")}>
        <LogoImage src={Logo} alt="Commit Logo" />
      </LogoButton>
      <MenuButton onClick={() => navigate("/Company")}>commit 소개</MenuButton>
      <MenuButton>고객서비스</MenuButton>
      <MenuButton onClick={() => navigate("/Test")}>회원테스트</MenuButton>
      <MenuButton onClick={() => navigate("/Reviews")}>회원리뷰</MenuButton>
      {/* <MenuButton onClick={() => navigate("/MyPage")}>마이페이지</MenuButton> */}
      <MenuButton onClick={() => navigate(isAdmin ? "/Admin" : "/MyPage")}>
        {isAdmin ? "관리자페이지" : "마이페이지"}
      </MenuButton>
      {/* <MenuButton onClick={() => navigate("/SignIn")}>로그인</MenuButton> */}
      {content}
      <MenuButton onClick={() => navigate("/SignUp")}>회원가입</MenuButton>
    </HeaderContainer>
  );
}

// PropTypes validation 추가
Header.propTypes = {
  userSession: PropTypes.shape({
    member: PropTypes.string.isRequired, // member는 문자열이어야 하고 필수값임
  }).isRequired,
  deleteSession: PropTypes.func.isRequired,
};

export default Header;

// import { useNavigate } from "react-router-dom";
// import "../styles/header.css"; // CSS 파일 적용
// import Logo from "../images/logo.jpeg"; // 로컬 이미지 import

// function Header() {
//   const navigate = useNavigate();
//   return (
//     <div className="header-container">
//       <button className="logo-btn" onClick={() => navigate("/")}>
//         <img src={Logo} alt="Commit Logo" className="logo" />
//       </button>
//       <button className="menu-button">commit 소개</button>
//       <button className="menu-button">고객서비스</button>
//       <button className="menu-button">회원테스트</button>
//       <button className="menu-button" onClick={() => navigate("/Review")}>회원리뷰</button>
//       <button className="menu-button">마이페이지</button>
//       <button className="menu-button" onClick={() => navigate("/SignIn")}>로그인</button>
//       <button className="menu-button" onClick={() => navigate("/SignUp")}>회원가입</button>
//     </div>
//   );
// }

// export default Header;
