import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DegreeIcon from "../images/degree.png";
import CareerIcon from "../images/career.png";
import ProfileIcon from "../images/profile.png";
import FamilyIcon from "../images/family.png";
import { useAuth } from "../App";
import PhotoUploadModal from "./PhotoUploadModal";

// 상단 전체 박스
const TopBox = styled.div`
  // height: 10rem;
  height: auto; /* 자동으로 높이 조절되도록 변경 */
  min-height: 10rem; /* 기본 높이는 유지 */
  // border: 2px solid red;
  display: flex;

  background-color: rgb(255, 255, 255);
  border-top: 1px solid #d99696;
  border-bottom: 1.4px solid #d99696;
  // border: 1.4px solid #e7a7a7;
  padding: 0 2rem;
`;

// 프로필 정보를 담는 박스
const InnerBox = styled.div`
  width: 20rem;
  height: 100%;
  // border: 2px solid yellow;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  // border-right: 2px solid #d4d4d4;
  padding-bottom: 1rem;
`;

// 이름
const Name = styled.div`
  // border: 2px solid black;
  height: 2.5rem;
  text-align: center;
  font-weight: bold;
  // background-color: #ececec;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

// 등급
const Grade = styled.div`
  // border: 2px solid black;
  height: 1.5rem;
  text-align: center;

  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
`;

// 사진
// const Photo = styled.div`
//   // border-botton: 2px solid black;
//   height: 4.3rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const PhotoButton = styled.input`
//   width: 13rem;
//   height: 2.5rem;

//   border: none;
//   // background-color: #d99696;
//   background-color: #e7a7a7;
//   color: white;
//   cursor: pointer;
//   border-radius: 5px;
//   font-weight: bold;

//   &:hover {
//     background-color: #c06c6c;
//   }
// `;

// 업로드한 사진 보기
const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 7px;
`;

// 업로드 버튼
const UploadButton = styled.button`
  width: 7rem;
  height: 2.5rem;
  border: none;
  background-color: #e7a7a7;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    background-color: #c06c6c;
  }
`;

// 메뉴 버튼 컨테이너
const InnerSecondBox = styled.div`
  // border: 2px solid green;
  // width: 55rem;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex: 1;
`;

// 버튼~
const SignButton = styled.button`
  width: 8rem;
  height: 6rem;
  border: none;

  // background-color:rgb(255, 230, 230);
  background-color: rgb(255, 255, 255);

  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.3s;
  display: flex;
  flex-direction: column; /* 📌 이미지 + 폰트 세로 정렬 */
  align-items: center;
  justify-content: center;
  gap: 5px; /* 📌 이미지와 폰트 사이 간격 */

  &:hover {
    background-color: rgb(255, 187, 187);
    // background-color: rgb(242, 242, 242);
  }
`;

const SignButtonImage = styled.img`
  width: 30px; /* 📌 이미지 크기 */
  height: 30px;
  margin-bottom: 8px;
`;

function TopBar({ getDegree, getCareer, getProfile, getFamily }) {
  const apiUrl = "http://localhost:8927";

  // const [file, setFile] = useState(null);
  // const { userSession } = useAuth();

  // const [file, setFile] = useState(null);
  const { userSession } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // 이미지 상태 추가

  const uploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const id = 1;
    try {
      const response = await fetch(
        apiUrl + "/api/photo/upload?profileId=" + id,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("데이터를 추가하지 못했습니다.");
      }

      // ✅ 이미지 업로드 후 미리보기 업데이트
      const imageUrl = URL.createObjectURL(file); // 서버 저장된 URL을 받아와야 하지만, 지금은 로컬 미리보기용
      setProfileImage(imageUrl);
    } catch (Error) {
      console.log(Error);
    }
  };

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (file) {
  //     console.log("선택한 파일:", file);
  //     uploadPhoto();
  //   } else {
  //     console.log("파일을 선택하세요.");
  //   }
  // };

  const navigate = useNavigate();
  return (
    <TopBox>
      <InnerBox>
        <Name>{userSession.name}님 안녕하세요</Name>
        <Grade>회원유형: {userSession.member}</Grade>

        {/*  업로드한 이미지 미리보기 추가 */}
        {profileImage && <ProfileImage src={profileImage} alt="프로필 사진" />}

        {/* <form onSubmit={handleSubmit}>
          <Photo>
            <PhotoButton type="file" onChange={handleFileChange} />
          </Photo>
          <button type="submit">업로드</button>
        </form> */}
        <UploadButton onClick={() => setShowModal(true)}>업로드</UploadButton>
      </InnerBox>
      <InnerSecondBox>
        <SignButton
          onClick={() => {
            getDegree();
          }}
        >
          <SignButtonImage src={DegreeIcon} alt="학위" />
          학위/자격정보
        </SignButton>
        <SignButton
          onClick={() => {
            getCareer();
          }}
        >
          <SignButtonImage src={CareerIcon} alt="직장" />
          직장정보
        </SignButton>
        <SignButton
          onClick={() => {
            getProfile();
          }}
        >
          <SignButtonImage src={ProfileIcon} alt="신상" />
          신상정보
        </SignButton>
        <SignButton
          onClick={() => {
            getFamily();
          }}
        >
          <SignButtonImage src={FamilyIcon} alt="가족" />
          가족사항
        </SignButton>
      </InnerSecondBox>

      {/* 모달 추가 ✅ */}
      {showModal && (
        <PhotoUploadModal
          closeModal={() => setShowModal(false)}
          uploadPhoto={uploadPhoto}
        />
      )}
    </TopBox>
  );
}
export default TopBar;
