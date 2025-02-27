import { useEffect, useState } from "react";

import Footer from "../components/Footer";
import Modal from "../modal_components/Modal";
import ProfileContent from "../profile_components/ProfileContent";
import { useAuth } from "../App";
import { useLocation } from "react-router-dom";
import NoInfo from "../profile_components/NoInfo";

function Profile() {
  const location = useLocation();
  // console.log(location);
  const [profile, setProfile] = useState(location.state.profile);
  const [open, setOpen] = useState(false);
  const apiUrl = "http://localhost:8927";
  const { userSession } = useAuth();

  let content = null;
  let mainContent = null;

  const ControllModal = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const modifyProfile = async (data) => {
    let hobbyOne = null;
    let diseaseOne = null;
    if (!Array.isArray(data.hobby)) {
      hobbyOne = data.hobby;
    } else {
      hobbyOne = data.hobby.join(", ");
    }
    if (!Array.isArray(data.disease)) {
      diseaseOne = data.disease;
    } else {
      diseaseOne = data.disease.join(", ");
    }

    const newState = {
      ...profile,
      weight: data.weight,
      height: data.height,
      mbti: data.mbti,
      hobby: hobbyOne,
      military: data.military,
      religion: data.religion,
      wealth: data.wealth,
      marriage: data.marriage,
      disease: diseaseOne,
    };
    try {
      const response = await fetch(apiUrl + "/api/profile/modify", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newState),
      });
      if (!response.ok) {
        console.log(newState);
        throw new Error("데이터를 추가하지 못했습니다.");
      }
      console.log(newState);
      ControllModal();
    } catch (Error) {
      console.log(Error);
    }
  };

  const addProfileInfo = async (data) => {
    const newState = {
      weight: data.weight,
      height: data.height,
      mbti: data.mbti,
      hobby: data.hobby,
      military: data.military,
      religion: data.religion,
      wealth: data.wealth,
      marriage: data.marriage,
      disease: data.disease,
      userId: userSession.id,
    };
    try {
      const response = await fetch(apiUrl + "/api/profile/insert", {
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
      getProfile();
      ControllModal();
    } catch (Error) {
      console.log(Error);
    }
  };

  const getProfile = async () => {
    try {
      const response = await fetch(apiUrl + "/api/profile/" + userSession.id);
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
      const data = await response.json();
      setProfile(data);
    } catch (Error) {
      console.log(Error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [profile]);

  if (open === true) {
    content = (
      <Modal
        ControllModal={ControllModal}
        concept={"profile"}
        modifyProfile={modifyProfile}
        profileInfo={profile}
        addProfileInfo={addProfileInfo}
      />
    );
  } else if (open === false) {
    content = null;
  }

  if (profile.id === "") {
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
        <ProfileContent ControllModal={ControllModal} profile={profile} />
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
export default Profile;
