import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  background-color: #ffffff;
  // border: 2px solid black;
  position: fixed;
  width: 40rem;
  height: 40rem;
  top: 50%;
  margin-top: -20rem;
  left: 50%;
  margin-left: -20rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  overflow: auto;
`;

//  닫기 버튼
const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  margin-bottom: 20px;
  margin-right: 20px;
`;

const Button = styled.button`
  margin: 0.3rem;
  font-weight: 600;
  margin-right: 20px;
  margin-top: 10px;
  font-size: 17px;
  // padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background: #ffffff;

  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
`;

const Title = styled.h2`
  margin-left: 30px;
  color: #d99696; /* 기본 텍스트 색 */
`;

const InputContainer = styled.div`
  /* display: flex; */
  align-items: center;
  margin-left: 30px;
  margin-bottom: 10px;
`;
const UploadContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 배치 */
  align-items: flex-start; /* 왼쪽 정렬 */
  margin-left: 30px;
  margin-bottom: 10px;
`;
const Div = styled.div`
  margin-top: 10px;
  margin-left: 30px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  /* Input 스타일 정의 */
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const UploadInput = styled.input`
  /* Input 스타일 정의 */
  width: 80%;
  padding: 5px;
  margin-bottom: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const ContentTextarea = styled.textarea`
  width: 85%;
  height: 20%;
  padding: 10px;
  margin-bottom: 10px;
  margin-left: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const ImagePreview = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
`;
const SaveButton = styled.button`
  width: 120px;
  height: 40px;
  font-size: 1rem;
  margin-left: 480px;
  margin-top: 10px;
  font-weight: bold;
  color: #d99696; /* 기본 텍스트 색 */
  background: #ffffff;
  border: 2px solid #ebb9b9;
  position: relative;
  border-radius: 5px;
  cursor: pointer;
`;
const ImagePreviewContainer = styled.div`
  display: flex;
  align-items: center;
`;
const CancelButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  margin-left: 10px;
`;

function ReviewModal({ controllModal, user, addReview }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(user?.title || "");
  const [content, setContent] = useState(user?.contents || "");
  const [rating, setRating] = useState(user?.rating || "");
  const [image, setImage] = useState(user?.image || "");
  const [preview, setPreview] = useState(user?.image || "");

  // 이미지 업로드 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // 미리보기 이미지 설정
        setImage(reader.result); // 저장할 이미지 데이터 설정
      };
      reader.readAsDataURL(file);
    }
  };

  // 저장 버튼 클릭 시
  const handleSave = () => {
    const updatedReview = {
      ...user,
      title,
      contents: content,
      image,
    };
    onSave(updatedReview); // 부모 컴포넌트로 업데이트된 리뷰 전달
    // controllModal(); // 모달 닫기
    // navigate("/-1");
  };

  //  이미지 파일 취소버튼
  const handleCancelImage = () => {
    setPreview(null);
    setImage(null);
  };

  const data = {
    title: title,
    contents: content,
    rating: rating,
  };

  return (
    <Container>
      <Box>
        <TopBar>
          <Button onClick={() => controllModal()}>X</Button>
        </TopBar>

        <Title>리뷰 수정</Title>
        <InputContainer>
          <label>제목</label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputContainer>

        <Div>리뷰 내용</Div>
        <ContentTextarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <InputContainer>
          <label>별점</label>
          <Input
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </InputContainer>

        <UploadContainer>
          <label>사진 업로드</label>
          <UploadInput
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {preview && (
            <ImagePreviewContainer>
              <ImagePreview src={preview} alt="업로드된 이미지 미리보기" />
              <CancelButton onClick={handleCancelImage}>취소</CancelButton>
            </ImagePreviewContainer>
          )}
        </UploadContainer>

        <SaveButton onClick={() => addReview(data)}>저장</SaveButton>
      </Box>
    </Container>
  );
}
export default ReviewModal;
