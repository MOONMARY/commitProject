import { useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";

function NoInfo({ ControllModal }) {
  const navigate = useNavigate();

  return (
    <>
      <ProfileButton onClick={() => ControllModal()} text={"입력하기"} />
      <ProfileButton onClick={() => navigate("/MyPage")} text={"뒤로가기"} />
    </>
  );
}
export default NoInfo;
