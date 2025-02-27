import styled from "styled-components";
const Container = styled.div`
  width: 85rem;
  // border: solid 2px pink;
  margin-top: 50px;
`;
const Box = styled.div`
  width: 85rem;
  height: 3rem;
  // border: solid 2px grey;
  display: flex;

  align-items: center; /* 텍스트를 가운데 정렬 */
  padding: 0 1rem;
  margin-bottom: 3px;
`;
const Title = styled.div`
  // border: solid 2px blue;
  width: 10rem;
  height: 100%;

  background-color: #ece7f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
const Content = styled.div`
  // border: solid 2px green;
  width: 75rem;
  height: 100%;

  display: flex;
  align-items: center;
  padding-left: 1rem;
  // border-bottom: 2px solid rgba(255, 192, 203, 0.7);
  box-shadow: inset 0px -3px 4px rgba(203, 193, 213, 0.3);
  color: grey;
`;

function ContentBox({ profile }) {
  // ✅ profile을 props로 받음

  return (
    <Container>
      <Box>
        <Title>몸무게</Title>

        <Content>{profile?.weight || "입력해주세요"}</Content>
      </Box>
      <Box>
        <Title>키</Title>
        <Content>{profile?.height || "입력해주세요"}</Content>
      </Box>
      <Box>
        <Title>mbti</Title>
        <Content>{profile?.mbti || "입력해주세요"}</Content>
      </Box>
      <Box>
        <Title>취미</Title>
        <Content>
          {/* {profile?.hobby && profile?.hobby?.length > 0
            ? profile.hobby?.join(", ") // ✅ 선택된 취미 쉼표(,)로 구분하여 출력
            : "입력해주세요"} */}
          {profile?.hobby}
        </Content>
      </Box>
      <Box>
        <Title>군필여부</Title>
        <Content>{profile?.military || "입력해주세요"}</Content>
      </Box>
      <Box>
        <Title>종교</Title>
        <Content>{profile?.religion || "입력해주세요"}</Content>
      </Box>
      <Box>
        <Title>재산</Title>
        <Content>{profile?.wealth || "입력해주세요"}</Content>
      </Box>
      <Box>
        <Title>결혼여부</Title>
        <Content>{profile?.marriage || "입력해주세요"}</Content>
      </Box>
      <Box>
        <Title>질병여부</Title>
        <Content>{profile?.disease || "입력해주세요"}</Content>
      </Box>
    </Container>
  );
}
export default ContentBox;
