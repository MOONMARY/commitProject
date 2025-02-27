import { useEffect, useState } from "react";
import CareerContent from "../career_components/CareerContent";
import Footer from "../components/Footer";
import Modal from "../modal_components/Modal";
import { useLocation } from "react-router-dom";
import { useAuth } from "../App";
import NoInfo from "../career_components/NoInfo";
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
  color: #959595;
  margin-top: 110px;
  font-family: "MapoPeacefull";
  margin-bottom: 50px;
`;


function Career() {
  const location = useLocation();
  // console.log(location);
  const [career, setCareer] = useState(location.state.career);
  const apiUrl = "http://localhost:8927";
  const { userSession } = useAuth();
  const [open, setOpen] = useState(false);

  let content = null;
  let mainContent = null;

  const ControllModal = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const modifyCareer = async (data) => {
    const newData = {
      ...career,
      salary: data.salary,
      job: data.job,
    };
    try {
      const response = await fetch(apiUrl + "/api/career/modify", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        throw new Error("데이터를 추가하지 못했습니다.");
      }
      console.log(newData);
      ControllModal();
    } catch (Error) {
      console.log(Error);
    }
  };

  const addCareer = async (data) => {
    const newState = {
      salary: data.salary,
      job: data.job,
      userId: userSession.id,
    };
    try {
      const response = await fetch(apiUrl + "/api/career/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newState),
      });
      if (!response.ok) {
        throw new Error("데이터를 추가하지 못했습니다.");
      }
      console.log(JSON.stringify(newState));
      getCareer();
      ControllModal();
    } catch (Error) {
      console.log(Error);
    }
  };

  const getCareer = async () => {
    try {
      const response = await fetch(apiUrl + "/api/career/" + userSession.id);
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
      const data = await response.json();
      setCareer(data);
    } catch (Error) {
      console.log(Error);
    }
  };

  useEffect(() => {
    getCareer();
  }, [career]);

  if (open === true) {
    content = (
      <Modal
        ControllModal={ControllModal}
        concept={"career"}
        modifyCareer={modifyCareer}
        careerInfo={career}
        addCareer={addCareer}
      />
    );
  } else if (open === false) {
    content = null;
  }

  if (career.id === "") {
    mainContent = (
      <>
        <div>

          <Text>가족 사항 추가하기</Text>
        </div>
        <NoInfo ControllModal={ControllModal} />
        {content}
      </>
    );
  } else {
    mainContent = (
      <>
        <CareerContent ControllModal={ControllModal} career={career} />
        {content}
      </>
    );
  }

  return (
    <>
      {mainContent}
      <Footer />
    </>
  );
}
export default Career;
