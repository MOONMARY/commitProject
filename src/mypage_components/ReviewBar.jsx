import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";

const Box = styled.div`
  // border: 2px solid black;
  width: 35rem;
  height: 20rem;
  background-color: #fff;
  // border-radius: 10px;
  overflow: hidden;
  // border: 2px solid #d4d4d4;
  box-shadow: 0 7px 10px rgba(0, 0, 0, 0.1);
  // border-radius: 0 0 10px 10px;
`;
const Title = styled.div`
  // border: 2px solid grey;
  display: flex;
  justify-content: space-between;
  height: 3rem;

  align-items: center;
  background-color: #e7a7a7;
  border-radius: 10px 10px 0 0;
  padding: 0 1rem;
  font-weight: bold;
  border-bottom: 2px solid#e7a7a7;
`;

const TitleText = styled.div`
  // border: 2px solid red;
  // width: 20rem;
  height: 100%;

  display: flex;
  align-items: center; /* ✅ 수직 중앙 정렬 */
  padding-top: 3px; /* ✅ 글자를 아래로 내림 */
`;
// const TitleDetail = styled.div`
//   // border: 2px solid red;
//   height: 100%;

//   display: flex;
//   align-items: center; /* ✅ 수직 중앙 정렬 */
//   // padding-top: 3px; /* ✅ 글자를 아래로 내림 */
//   cursor: pointer;
// `;

const Button = styled.button`
  border: none;
  background-color: #e7a7a7;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
`;

const Content = styled.div`
  // border: 2px solid blue;
  width: 35rem;
  // height: 16.7rem;
  height: auto;
  display: flex;
  // justify-content: center;
  // align-items: center;
  flex-direction: column;
  padding: 1rem;
`;

const ReviewItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

function ReviewBar() {
  const navigate = useNavigate();
  const { userSession } = useAuth();
  const apiUrl = "http://localhost:8927";
  const [reviews, setReviews] = useState([]); // 리뷰 상태 관리

  useEffect(() => {
    fetchReviews();
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:8927")
  //     .then((res) => res.json())
  //     .then((data) => setReviews(data))
  //     .catch((error) => console.error("데이터 로딩 오류:", error));
  // }, []);

  const getReviews = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/review/mypage/${userSession.id}` // 로그인된 사용자에 해당하는 리뷰 요청
      );
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
      const data = await response.json();
      console.log("마이페이지", data);
      setReviews(data); // 받아온 데이터를 상태에 저장
    } catch (Error) {
      console.log(Error);
    }
  };

  const fetchReviews = async () => {
    try {
      // const response = await fetch("data.json");
      const response = await fetch(
        `${apiUrl}/api/review/list/` + userSession.id
      );
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
      const data = await response.json();
      console.log("리뷰", data);
      setReviews(data);
    } catch (Error) {
      console.log(Error);
    }
  };

  // 컴포넌트가 마운트 될 때 리뷰를 불러옴
  // useEffect(() => {
  //   if (userSession.id === ) {
  //     getReviews();
  //   }
  // }, [userSession]);

  // useEffect(() => {
  //   // mypage가 설정되고 userSession.id와 mypage.user_id가 같을 때, mypage.id와 review.mypage_id가 같으면 리뷰를 가져옵니다.
  //   if (mypage && userSession.id === mypage.user_id) {
  //     getReviews(); // mypage.id를 기준으로 리뷰를 가져옵니다.
  //   }
  // }, [mypage, userSession]); // mypage 또는 userSession이 변경될 때마다 호출

  // 샘플 리뷰 데이터
  // const [reviews] = useState([
  //   {
  //     id: 1,
  //     title: "추천 시스템이 좋아요",
  //     contents: "다양한 매칭 옵션이 있어서 선택의 폭이 넓었습니다.",
  //     image: "",
  //   },
  //   {
  //     id: 2,
  //     title: "분위기 최고네요~!",
  //     contents: "매니저님이 친절하게 상담해주셔서 만족스러웠어요.",
  //     image: "",
  //   },
  //   {
  //     id: 3,
  //     title: "믿고 가입하세요!",
  //     contents: "다른 곳보다 매칭률이 높아서 좋았어요.",
  //     image: "",
  //   },
  // ]);

  return (
    <Box>
      <Title>
        <TitleText>내 리뷰 현황</TitleText>
        {/* <TitleDetail>자세히보기</TitleDetail> */}
        <Button onClick={() => navigate("/review/new")}>새 리뷰 작성</Button>
      </Title>
      <Content>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewItem
              key={review.id}
              onClick={() =>
                navigate(`/review/${review.id}`, { state: review })
              }
            >
              {review.title}
            </ReviewItem>
          ))
        ) : (
          <p>진행중인 리뷰가 없습니다.</p>
        )}
      </Content>
    </Box>
  );
}

export default ReviewBar;
