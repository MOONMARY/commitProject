import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../App";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  background-color: rgb(243, 192, 192);
`;

const Box = styled.div`
  margin: 20px;

  border-radius: 20px;

  width: 80%;
  max-width: 800px;
  padding: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 26px;
  color: #d27d92;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 90%;
  height: 120px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 120px;
  padding: 10px;
  border: none;
  background-color: #d27d92;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #b26579;
  }
`;

const BackButton = styled(Button)`
  background-color: #ccc; /* 뒤로가기 버튼 색상 변경 */
  color: black;

  &:hover {
    background-color: #999;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  margin: 15px 0;
`;

function ReviewForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mypage, setMypage] = useState(null);
  const [rating, setRating] = useState(5);
  const { userSession } = useAuth();
  const apiUrl = "http://localhost:8927";

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      id: Date.now(),
      title,
      contents: content,
      image,
    };

    // TODO: 백엔드 API로 전송하는 로직 추가 가능
    navigate("/reviews"); // 리뷰 목록 페이지로 이동
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // 미리보기 URL 생성
    }
  };

  useEffect(() => {
    getMypage();
  }, []);

  const getMypage = async () => {
    try {
      const response = await fetch(
        apiUrl + "/api/review/mypage/" + userSession.id
      );
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
      const data = await response.json();
      console.log(data);
      setMypage(data);
    } catch (Error) {
      console.log(Error);
    }
  };

  //  리뷰 작성
  const addReview = async (data) => {
    const newState = {
      mypageId: mypage.id,
      title: data.title,
      contents: data.contents,
      rating: data.rating,
      userId: userSession.id,
    };

    try {
      const response = await fetch(apiUrl + "/api/review/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newState),
      });

      if (!response.ok) {
        throw new Error("리뷰를 추가하지 못했습니다.");
      }
      console.log(JSON.stringify(newState)); // 요청한 데이터 출력

      // 서버에서 응답 받은 후 리뷰 목록 갱신
      // getReviews();
    } catch (Error) {
      console.log(Error);
    }
  };
  const data = {
    title: title,
    contents: content,
  };

  return (
    <Container>
      <Box>
        <Title>리뷰 작성</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="리뷰 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* ✅ 이미지 업로드 추가 */}
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {/* ✅ 이미지 미리보기 */}
          {preview && <ImagePreview src={preview} alt="미리보기" />}

          <Input
            type="number"
            placeholder="별점"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
          />
          <TextArea
            placeholder="리뷰 내용을 입력하세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {/* ✅ 버튼 컨테이너 추가 (작성 완료 + 뒤로가기) */}
          <ButtonContainer>
            <Button type="submit" onClick={() => addReview(data)}>
              작성 완료
            </Button>
            <BackButton type="button" onClick={() => navigate("/MyPage")}>
              뒤로가기
            </BackButton>
          </ButtonContainer>
        </form>
      </Box>
    </Container>
  );
}

export default ReviewForm;
