import { useNavigate } from "react-router-dom";
import CareerButton from "./CareerButton";

function NoInfo({ ControllModal }) {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", textAlign: "center" }}>  
      <CareerButton onClick={() => ControllModal()} text={"입력하기"} />
      <CareerButton onClick={() => navigate("/MyPage")} text={"뒤로가기"} />
    </div>
  );
}
export default NoInfo;
