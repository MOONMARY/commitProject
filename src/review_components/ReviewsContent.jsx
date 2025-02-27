import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 94.15rem;
  // border: 2px solid black;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: rgb(248, 244, 244);
`;

// 각 리뷰 박스 스타일
const Box = styled.div`
  margin: 20px 50px 20px;
  // border: 2px solid gray;
  width: 10rem;
  height: 15rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  background: rgb(233, 230, 230);
  box-shadow: 0 4px 10px rgba(202, 87, 87, 0.116); /* 부드러운 그림자 효과 */
  overflow: hidden; /* 내부 내용이 넘치지 않도록 */
  transition: transform 0.3s ease-in-out; /* 마우스 오버 애니메이션 */

  &:hover {
    transform: scale(1.05); /* 마우스를 올리면 살짝 커지는 효과 */
  }
`;

// 이미지 박스 스타일
const Content = styled.div`
  // border: 2px solid green;
  border-radius: 4px;
  width: 100%;
  background-color: rgb(243, 192, 192);
  &:first-child {
    height: 11rem;
  }

  // display: flex;
  // align-items: center;
  // justify-content: center;
  font-size: 14px;
  color: white;
  // font-weight: bold;
`;

// 제목 스타일
const Title = styled(Content)`
  height: 2rem;
  font-size: 0.9rem;
  // font-weight: 0.2rem;
  font-weight: bold;
  color: rgb(238, 118, 118);
  text-align: center;
  padding: 5px 10px;
  background-color: #f2f2f2;
`;

// 날짜 스타일
const Date = styled(Content)`
  font-size: 0.7rem;
  font-weight: 700;
  color: #555;
  text-align: center;
  // padding-bottom: 9px;
  background-color: #f2f2f2;
`;

function ReviewsContent({ reviews }) {
  const navigate = useNavigate();
  return (
    <Container>
      {reviews.map((item) => (
        <Box key={item.id}>
          <Content
            onClick={() => {
              navigate("/Review?id=" + item.id, { state: { item } });
            }}
          >
            사진
          </Content>
          <Title>{item.title}</Title>
          <Date>
            {item.regDate}
            별점:{item.rating}
          </Date>
        </Box>
      ))}
    </Container>
  );
}
export default ReviewsContent;
