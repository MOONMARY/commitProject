import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  // border: 2px solid black;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  // background-color: #D2989C;
  background-color: rgb(243, 192, 192);
`;

const Box = styled.div`
  position: relative;
  margin: 20px;
  // border: 2px solid gray;
  border-radius: 20px;
  width: 80%;
  height: 30rem;
  max-width: 800px;
  padding: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: rgba(255, 255, 255, 0.9); /* 반투명 흰색 배경 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /*부드러운 그림자 */
`;

const Content = styled.div`
  // border: 2px solid gray;
  width: 100%;
  font-family: "sans-serif";
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  font-family: "cursive";
  font-size: 26px;
  color: #d27d92;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin: 15px 0;
`;

const Rating = styled.div`
  width: 100%;
  font-family: "sans-serif";
  font-size: 18px;
  color: #d27d92;
  margin-bottom: 15px;
  text-align: center; /* 가운데 정렬 추가 */
  font-weight: bold; /* 폰트 굵게 */
`;
const EditButton = styled.button`
  position: absolute;
  bottom: 30px;
  right: 40px;
  padding: 10px 20px;
  background-color: #d99696;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c27878;
  }
`;
function ReviewContent({ user, controllModal }) {
  return (
    <Container>
      <Box>
        <Title>{user.title}</Title>
        <Rating>별점: {user.rating}</Rating>
        <Image src={user.image} alt="사진" />
        <Content>{user.contents}</Content>
        <EditButton onClick={() => controllModal()}> 리뷰 수정하기</EditButton>
      </Box>
    </Container>
  );
}

export default ReviewContent;

// import styled from "styled-components";

// const Container = styled.div`
//   width: 100%;
//   border: 2px solid black;
//   display: flex;
//   justify-content: center;
// `;
// const Box = styled.div`
//   margin: 20px;
//   border: 2px solid gray;
//   width: 80%;
//   height: 30rem;
// `;
// const Content = styled.div`
//   border: 2px solid gray;
// `;

// function ReviewContent({ user }) {
//   console.log(user);
//   return (
//     <Container>
//       <Box>
//         <Content>제목:{user.title} </Content>
//         <Content>사진:</Content>
//         <Content>내용:{user.contents}</Content>
//       </Box>
//     </Container>
//   );
// }
// export default ReviewContent;
