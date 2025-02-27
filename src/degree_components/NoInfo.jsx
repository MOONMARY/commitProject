import { useNavigate } from "react-router-dom";
import DegreeButton from "./DegreeButton";

function NoInfo({ ControllModal }) {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", textAlign: "center" }}> 
      <DegreeButton onClick={() => ControllModal()} text={"입력하기"} />
      <DegreeButton onClick={() => navigate("/MyPage")} text={"뒤로가기"} />
    </div>
  );
}
export default NoInfo;
