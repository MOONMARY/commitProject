import Header from "../components/header";
import SignUpForm from "../signup_components/SignUpForm";
import Footer from "../components/Footer";
import { useState } from "react";
import { useContext } from "react";
import { useAuth } from "../App";

function SignUp() {
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    birth: "",
    address: "",
    member: "일반회원",
    phoneNumber: "",
  });
  const apiUrl = "http://localhost:8927";

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.name + "+" + e.target.value);
    setSignUpInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addUser = async () => {
    try {
      const response = await fetch(apiUrl + "/api/user/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpInfo),
      });
      if (!response.ok) {
        throw new Error("데이터를 추가하지 못했습니다.");
      }
      console.log(JSON.stringify(signUpInfo));
    } catch (Error) {
      console.log(Error);
    }
  };

  return (
    <>
      <SignUpForm
        signUpInfo={signUpInfo}
        handleChange={handleChange}
        addUser={addUser}
      />
      <Footer />
    </>
  );
}
export default SignUp;
