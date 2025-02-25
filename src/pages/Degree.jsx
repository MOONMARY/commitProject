import { useEffect, useState } from "react";
import DegreeContent from "../degree_components/DegreeContent";
import Footer from "../components/Footer";
import Modal from "../modal_components/Modal";
import { useLocation } from "react-router-dom";
import NoInfo from "../degree_components/NoInfo";
import { useAuth } from "../App";

function Degree() {
  const location = useLocation();
  // console.log(location);
  const [degree, setDegree] = useState(location.state.degree);
  const [open, setOpen] = useState(false);
  const apiUrl = "http://localhost:8927";
  const { userSession } = useAuth();

  let content = null;
  let mainContent = null;

  const ControllModal = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const modifyDegree = async (data) => {
    const newDegree = {
      ...degree,
      middleSchool: data.middleSchool,
      highSchool: data.highSchool,
      highMajor: data.highMajor,
      university: data.university,
      universityMajor: data.universityMajor,
      graduateSchool: data.graduateSchool,
      graduateMajor: data.graduateMajor,
    };
    try {
      const response = await fetch(apiUrl + "/api/degree/modify", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDegree),
      });
      if (!response.ok) {
        throw new Error("데이터를 추가하지 못했습니다.");
      }
      console.log(newDegree);
      ControllModal();
    } catch (Error) {
      console.log(Error);
    }
  };

  const addDegreeInfo = async (data) => {
    const newDegree = {
      middleSchool: data.middleSchool,
      highSchool: data.highSchool,
      highMajor: data.highMajor,
      university: data.university,
      universityMajor: data.universityMajor,
      graduateSchool: data.graduateSchool,
      graduateMajor: data.graduateMajor,
      userId: userSession.id,
    };
    try {
      const response = await fetch(apiUrl + "/api/degree/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDegree),
      });
      if (!response.ok) {
        throw new Error("데이터를 추가하지 못했습니다.");
      }
      console.log(JSON.stringify(newDegree));
      getDegree();
      ControllModal();
    } catch (Error) {
      console.log(Error);
    }
  };

  const getDegree = async () => {
    try {
      const response = await fetch(apiUrl + "/api/degree/" + userSession.id);
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
      const data = await response.json();
      setDegree(data);
    } catch (Error) {
      console.log(Error);
    }
  };

  useEffect(() => {
    getDegree();
  });

  if (open === true) {
    content = (
      <Modal
        ControllModal={ControllModal}
        concept={"degree"}
        modifyDegree={modifyDegree}
        degreeInfo={degree}
        addDegreeInfo={addDegreeInfo}
      />
    );
  } else if (open === false) {
    content = null;
  }

  if (degree.id === "") {
    mainContent = (
      <>
        <div>테이블 없음 인서트 하러 가기</div>
        <NoInfo ControllModal={ControllModal} />
        {content}
      </>
    );
  } else {
    mainContent = (
      <>
        <DegreeContent ControllModal={ControllModal} degree={degree} />
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
export default Degree;
