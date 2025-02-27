import React, { use, useEffect, useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  text-align: left;
  max-height: 730px; /* 화면에 맞게 모달 크기 제한 */
  overflow-y: auto; /* 내용이 길어지면 스크롤이 생기도록 */
  height: 100%; /* 스크롤이 닫기 버튼까지 내려가도록 height 설정 */
  height: 80%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 30px;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 14px;
  width: 100%;
`;

const Button = styled.button`
  // width: 20%;
  flex: 1 1 30%; /* 버튼의 너비가 자동으로 조정되도록 설정 */
  min-width: 80px; /* 버튼이 너무 좁아지지 않도록 최소 너비 설정 */
  padding: 12px;
  height: 40px;
  border: none;
  // border-radius: 10px;
  background-color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-align: center; /* 버튼 텍스트를 가운데로 정렬 */
  flex-direction: column;
  align-items: center;
  display: flex;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #e0e0e0;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;

const CloseButton = styled(Button)`
  background-color: #ffffff;
  color: #000000;
  font-weight: bold;
  // border-radius: 15px;

  &:hover {
    background-color: #ffffff;
    color: #ff0000;
  }
`;

const ActionButton = styled(Button)`
  background-color: #ffffff;
  color: #0400fc;
  fxont-weight: bold;
  font-weight: bold;

  &:hover {
    background-color: #ffffff;
  }
`;

const ContentSection = styled.div`
  background-color: #e9e9e9;
  padding: 10px;
  margin-top: 30px;
  border-radius: 8px;
`;

const InfoTextB = styled.p`
  font-size: 16px; /* 텍스트 크기 조정 */
  color: #333; /* 텍스트 색상 */
  margin: 8px 0; /* 상하 여백 조정 */
  line-height: 1.5; /* 줄 간격 조정 */
  padding-left: 10px; /* 왼쪽 패딩 추가 */
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 10px;
`;

const InfoText = styled.p`
  font-size: 16px; /* 텍스트 크기 조정 */
  color: #333; /* 텍스트 색상 */
  margin: 8px 0; /* 상하 여백 조정 */
  line-height: 1.5; /* 줄 간격 조정 */
  padding-left: 10px; /* 왼쪽 패딩 추가 */
  border-radius: 8px;
  padding: 10px;
`;

const Header = styled.h3`
  font-size: 25px; /* 폰트 크기 */
  color: #484ac5; /* 헤더 색상 */
  margin-bottom: 58px; /* 아래 마진 */
  font-weight: bold;
  text-align: center;
`;

function AdminUserModal({ user, onClose, infoState, setInfoState }) {
  const [degree, setDegree] = useState();
  const [career, setCareer] = useState();
  const [profile, setProfile] = useState();
  const [family, setFamily] = useState();

  const apiUrl = "http://localhost:8927";

  const getDegree = async () => {
    try {
      const response = await fetch(apiUrl + "/api/degree/" + user.id);
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
      const data = await response.json();
      setDegree(data);
    } catch (Error) {
      console.log(Error);
    }
  };
  const getCareer = async () => {
    try {
      const response = await fetch(apiUrl + "/api/career/" + user.id);
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
      const data = await response.json();
      setCareer(data);
    } catch (Error) {
      console.log(Error);
    }
  };
  const getProfile = async () => {
    try {
      const response = await fetch(apiUrl + "/api/profile/" + user.id);
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
      const data = await response.json();
      setProfile(data);
    } catch (Error) {
      console.log(Error);
    }
  };
  const getFamily = async () => {
    try {
      const response = await fetch(apiUrl + "/api/family/" + user.id);
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
      const data = await response.json();
      setFamily(data);
    } catch (Error) {
      console.log(Error);
    }
  };

  useEffect(() => {
    getDegree();
    getCareer();
    getProfile();
    getFamily();
  }, []);

  if (!user) return null;

  let content = (
    <>
      <Header>{user?.name} 상세 정보</Header>
      <InfoTextB>id: {user?.id}</InfoTextB>
      <InfoTextB>이름: {user?.name}</InfoTextB>
      <InfoTextB>이메일: {user?.email}</InfoTextB>
      <InfoTextB>비밀번호: {user?.password}</InfoTextB>
      <InfoTextB>성별: {user?.gender}</InfoTextB>
      <InfoTextB>생년월일: {user?.birth}</InfoTextB>
      <InfoTextB>주소: {user?.address}</InfoTextB>
      <InfoTextB>등급: {user?.member}</InfoTextB>
      <InfoTextB>전화번호: {user?.phoneNumber}</InfoTextB>
    </>
  );

  // 선택된 항목을 infoState에 따라 추가하기
  if (infoState === "degree") {
    content = (
      <>
        {content}
        <ContentSection>
          <InfoText>고등학교: {degree?.highSchool}</InfoText>
          <InfoText>중학교: {degree?.middleSchool}</InfoText>
          <InfoText>고등학교 전공: {degree?.highMajor}</InfoText>
          <InfoText>대학교: {degree?.university}</InfoText>
          <InfoText>대학교 전공: {degree?.universityMajor}</InfoText>
          <InfoText>대학원: {degree?.graduateSchool}</InfoText>
          <InfoText>대학원 전공: {degree?.graduateMajor}</InfoText>
        </ContentSection>
      </>
    );
  }

  if (infoState === "career") {
    content = (
      <>
        {content}
        <ContentSection>
          <InfoText>직업: {career?.job}</InfoText>
          <InfoText>연봉: {career?.salary}</InfoText>
        </ContentSection>
      </>
    );
  }

  if (infoState === "profile") {
    content = (
      <>
        {content}
        <ContentSection>
          <InfoText>몸무게: {profile?.weight}</InfoText>
          <InfoText>키: {profile?.height}</InfoText>
          <InfoText>mbti: {profile?.mbti}</InfoText>
          <InfoText>취미: {profile?.hobby}</InfoText>
          <InfoText>병역 여부: {profile?.military}</InfoText>
          <InfoText>종교: {profile?.religion}</InfoText>
          <InfoText>재산: {profile?.wealth}</InfoText>
          <InfoText>결혼 여부: {profile?.marriage}</InfoText>
          <InfoText>질병 여부: {profile?.disease}</InfoText>
        </ContentSection>
      </>
    );
  }

  if (infoState === "family") {
    content = (
      <>
        {content}
        <ContentSection>
          <InfoText>어머니: {family?.mother}</InfoText>
          <InfoText>아버지: {family?.father}</InfoText>
          <InfoText>자식: {family?.child}</InfoText>
          <InfoText>형제/자매: {family?.sibling}</InfoText>
        </ContentSection>
      </>
    );
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {content}
        <ButtonContainer>
          <ButtonRow>
            <Button onClick={() => setInfoState("user")}>기본 정보</Button>
          </ButtonRow>
          <ButtonRow>
            <Button onClick={() => setInfoState("degree")}>학위 정보</Button>
            <Button onClick={() => setInfoState("career")}>직업 정보</Button>
            <Button onClick={() => setInfoState("profile")}>신상 정보</Button>
            <Button onClick={() => setInfoState("family")}>가족 정보</Button>
          </ButtonRow>
          <ButtonRow>
            <ActionButton onClick={onClose}>고객 정보 수정</ActionButton>
            <ActionButton onClick={onClose}>고객 정보 삭제</ActionButton>
            <CloseButton onClick={onClose}>닫기</CloseButton>
          </ButtonRow>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
}

export default AdminUserModal;
