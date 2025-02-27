import styled from "styled-components";
import ContentBox from "./ContentBox";

import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import ProfileButton from "./ProfileButton";

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
  justify-content: flex-end;
  gap: 50px; // 버튼 사이 간격 조정
  margin-top: 1rem;
`;

function ProfileContent({ ControllModal, profile }) {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <TopBar title={"신상 정보"} />
        <ContentBox profile={profile} />
        <Box>
          <ProfileButton onClick={() => ControllModal()} text={"수정하기"} />
          <ProfileButton
            onClick={() => navigate("/MyPage")}
            text={"뒤로가기"}
          />
        </Box>
      </Container>
    </>
  );
}
export default ProfileContent;
