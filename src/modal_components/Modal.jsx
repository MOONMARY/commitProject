import styled from "styled-components";
import DegreeModalContent from "./DegreeModalContent";
import CareerModalContent from "./CareerModalContent";
import ProfileModalContent from "./ProfileModalContent";
import FamilyModalContent from "./FamilyModalContent";
import { useState } from "react";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const Box = styled.div`
  background-color: white;
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

const TopBar = styled.div`
  // border: 2px solid black;
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  margin-bottom: 50px;
  margin-right: 30px;
`;
const Button = styled.button`
  margin: 0.3rem;
  font-weight: 600;
  margin-right: 40px;
  margin-top: 50px;

  // padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background: #ffffff;

  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #ddd;
  }
`;

const Bottom = styled.div`
  width: 100%;
  // border: 2px solid black;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  margin-bottom: 90px;
`;

function Modal({
  ControllModal,
  concept,
  // degree 정보, 수정, 추가
  degreeInfo,
  modifyDegree,
  addDegreeInfo,
  // career 정보, 수정, 추가
  careerInfo,
  modifyCareer,
  addCareer,
  // profile 정보, 수정, 추가
  profileInfo,
  modifyProfile,
  addProfileInfo,

  // family 정보, 수정 ,추가
  familyInfo,
  modifyFamily,
  addFamilyInfo,
}) {
  const [degree, setDegree] = useState(degreeInfo);

  const [career, setCareer] = useState(careerInfo);

  const [profile, setProfile] = useState(profileInfo);

  const [family, setFamily] = useState(familyInfo);

  const degreeHandleChange = (e) => {
    const { name, value } = e.target;

    setDegree((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const careerHandleChange = (e) => {
    const { name, value } = e.target;

    setCareer((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const profileHandleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const familyHandleChange = (e) => {
    const { name, value } = e.target;

    setFamily((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  let content = null;
  if (concept === "degree" && degree.id === "") {
    content = (
      <>
        <DegreeModalContent degree={degree} handleChange={degreeHandleChange} />
        <Bottom>
          <Button onClick={() => addDegreeInfo(degree)}>제출하기</Button>
        </Bottom>
      </>
    );
  } else if (concept === "degree" && (degree.id = !"")) {
    content = (
      <>
        <DegreeModalContent degree={degree} handleChange={degreeHandleChange} />
        <Bottom>
          <Button onClick={() => modifyDegree(degree)}>제출하기</Button>
        </Bottom>
      </>
    );
  } else if (concept === "career" && career.id === "") {
    content = (
      <>
        <CareerModalContent career={career} handleChange={careerHandleChange} />
        <Bottom>
          <Button onClick={() => addCareer(career)}>제출하기</Button>
        </Bottom>
      </>
    );
  } else if (concept === "career" && (career.id = !"")) {
    content = (
      <>
        <CareerModalContent career={career} handleChange={careerHandleChange} />
        <Bottom>
          <Button onClick={() => modifyCareer(career)}>제출하기</Button>
        </Bottom>
      </>
    );
  } else if (concept === "profile" && profile.id === "") {
    content = (
      <>
        <ProfileModalContent
          profile={profile}
          handleChange={profileHandleChange}
        />
        <Bottom>
          <Button onClick={() => addProfileInfo(profile)}>제출하기</Button>
        </Bottom>
      </>
    );
  } else if (concept === "profile" && (profile.id = !"")) {
    content = (
      <>
        <ProfileModalContent
          profile={profile}
          handleChange={profileHandleChange}
        />
        <Bottom>
          <Button onClick={() => modifyProfile(profile)}>제출하기</Button>
        </Bottom>
      </>
    );
  } else if (concept === "family" && family.id === "") {
    content = (
      <>
        <FamilyModalContent family={family} handleChange={familyHandleChange} />
        <Bottom>
          <Button onClick={() => addFamilyInfo(family)}>제출하기</Button>
        </Bottom>
      </>
    );
  } else if (concept === "family" && (family.id = !"")) {
    content = (
      <>
        <FamilyModalContent family={family} handleChange={familyHandleChange} />
        <Bottom>
          <Button onClick={() => modifyFamily(family)}>제출하기</Button>
        </Bottom>
      </>
    );
  }

  return (
    <Container>
      <Box>
        <TopBar>
          <Button onClick={() => ControllModal()}>X</Button>
        </TopBar>
        {content}
      </Box>
    </Container>
  );
}
export default Modal;
