import MyPageContent from "../mypage_components/MyPageContent";
import Footer from "../components/Footer";
import { useAuth } from "../App";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Text = styled.div`
  @font-face {
    font-family: "MapoPeacefull";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #eb8b8b;
  margin-top: 110px;
  font-family: "MapoPeacefull";
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  margin-bottom: 58px;
`;

const Buttonstyled = styled.button`
  @font-face {
    font-family: "MapoPeacefull";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  width: 120px;
  height: 40px;
  border: none;
  background-color: #ffffff;
  color: #eb8b8b;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  font-family: "MapoPeacefull";

  &:hover {
    background-color: #eb8b8b;
    color: #ffffff;
  }
`;

function MyPage() {
  const navigate = useNavigate();

  const apiUrl = "http://localhost:8927";
  const { userSession } = useAuth();
  const [getOn, setGetOn] = useState(false);
  const [degree, setDegree] = useState();
  const [career, setCareer] = useState();
  const [profile, setProfile] = useState();
  const [family, setFamily] = useState();

  const getDegree = async () => {
    try {
      const response = await fetch(apiUrl + "/api/degree/" + userSession.id);
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
      const data = await response.json();
      // console.log(data);
      setGetOn(true);
      setDegree(data);
    } catch (Error) {
      console.log(Error);
      // console.log("데이터를 입력하시오");
      setGetOn(true);
      setDegree({
        id: "",
        middleSchool: "",
        highSchool: "",
        highSchoolMajor: "",
        university: "",
        universityMajor: "",
        graduate: "",
        graduateMajor: "",
        userId: "",
      });
    }
  };
  const getCareer = async () => {
    try {
      const response = await fetch(apiUrl + "/api/career/" + userSession.id);
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
      const data = await response.json();
      setGetOn(true);
      setCareer(data);
    } catch (Error) {
      console.log(Error);
      setGetOn(true);
      setCareer({
        id: "",
        salary: "",
        job: "",
        userId: "",
      });
    }
  };

  const getProfile = async () => {
    try {
      const response = await fetch(apiUrl + "/api/profile/" + userSession.id);
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
      const data = await response.json();
      setGetOn(true);
      setProfile(data);
    } catch (Error) {
      console.log(Error);
      setGetOn(true);
      setProfile({
        id: "",
        weight: "",
        height: "",
        mbti: "",
        hobby: "",
        military: "",
        religion: "",
        wealth: "",
        marriage: "",
        disease: "",
        userId: "",
      });
    }
  };

  const getFamily = async () => {
    try {
      const response = await fetch(apiUrl + "/api/family/" + userSession.id);
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
      const data = await response.json();
      setGetOn(true);
      setFamily(data);
    } catch (Error) {
      console.log(Error);
      setGetOn(true);
      setFamily({
        id: "",
        mother: "",
        father: "",
        mbti: "",
        child: "",
        sibling: "",
        userId: "",
      });
    }
  };

  useEffect(() => {
    if (getOn) {
      navigate("/degree", {
        state: {
          degree,
        },
      }); // ✅ degree가 업데이트된 후 이동
    }
  }, [degree, navigate]);

  useEffect(() => {
    if (getOn) {
      navigate("/career", {
        state: {
          career,
        },
      }); // ✅ career가 업데이트된 후 이동
    }
  }, [career, navigate]);

  useEffect(() => {
    if (getOn) {
      navigate("/profile", {
        state: {
          profile,
        },
      }); // ✅ career가 업데이트된 후 이동
    }
  }, [profile, navigate]);

  useEffect(() => {
    if (getOn) {
      navigate("/family", {
        state: {
          family,
        },
      }); // ✅ career가 업데이트된 후 이동
    }
  }, [family, navigate]);

  let content = null;

  if (userSession === null) {
    content = (
      <div>
        <Text>로그인이 필요합니다</Text>
        <ButtonBox>
          <Buttonstyled onClick={() => navigate("/SignIn")}>
            로그인
          </Buttonstyled>
          <Buttonstyled onClick={() => navigate("/SignUp")}>
            회원가입
          </Buttonstyled>
        </ButtonBox>
      </div>
    );
  } else {
    content = (
      <MyPageContent
        getDegree={getDegree}
        getCareer={getCareer}
        getProfile={getProfile}
        getFamily={getFamily}
      />
    );
  }
  return (
    <>
      {content}
      <Footer />
    </>
  );
}
export default MyPage;
