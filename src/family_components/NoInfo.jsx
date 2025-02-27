import { useNavigate } from "react-router-dom";
import FamilyButton from "./FamilyButton";
import styled from "styled-components";


function NoInfo({ ControllModal }) {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", textAlign: "center" }}>  
      <FamilyButton onClick={() => ControllModal()} text={"입력하기"} />
      <FamilyButton onClick={() => navigate("/MyPage")} text={"뒤로가기"} />
    </div>
  );
}
export default NoInfo;
