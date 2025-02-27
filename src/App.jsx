import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Review from "./pages/Review";
import Reviews from "./pages/Reviews";
import MyPage from "./pages/MyPage";
import Admin from "./pages/Admin";
import Degree from "./pages/Degree";
import Career from "./pages/Career";
import Profile from "./pages/Profile";
import Family from "./pages/Family";
import Company from "./pages/Company";
import Test from "./pages/Test";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import ReviewContent from "./review_components/ReviewContent"; // 추가
import Header from "./components/header";
import ReviewForm from "./review_components/ReviewForm";
const themeContext = createContext(null);
function App() {
  const [userSession, setUserSession] = useState(null);
  const value = useMemo(() => ({ userSession }), [userSession]);
  const getSession = async () => {
    try {
      const response = await fetch("http://localhost:8927/api/user/session", {
        method: "GET",
        credentials: "include", // :흰색_확인_표시: 쿠키(JSESSIONID) 포함
      });
      if (response.ok) {
        const data = await response.text();
        setUserSession(JSON.parse(data));
        console.log("세션 상태:", data);
        // console.log(JSON.parse(data));
        return data;
      } else {
        console.warn("세션이 유효하지 않거나 만료되었습니다.");
        return null;
      }
    } catch (error) {
      console.error("세션 확인 중 오류 발생:", error);
      return null;
    }
  };
  const deleteSession = async () => {
    try {
      const response = await fetch("http://localhost:8927/api/user/logout", {
        method: "GET",
        credentials: "include", // :흰색_확인_표시: 쿠키(JSESSIONID) 포함
      });
      if (response.ok) {
        setUserSession(null);
        return null;
      } else {
        console.warn("세션이 유효하지 않거나 만료되었습니다.");
        return null;
      }
    } catch (error) {
      console.error("세션 확인 중 오류 발생:", error);
      return null;
    }
  };
  useEffect(() => {
    getSession();
  }, []);
  return (
    <themeContext.Provider value={value}>
      <Header userSession={userSession} deleteSession={deleteSession} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn getSession={getSession} />} />
        <Route path="/Review" element={<Review />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/review/:id" element={<ReviewContent />} />{" "}
        {/* 상세 리뷰 페이지 */}
        <Route path="/review/new" element={<ReviewForm />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Degree" element={<Degree />} />
        <Route path="/Career" element={<Career />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Family" element={<Family />} />
        <Route path="/Company" element={<Company />} />
        <Route path="/Test" element={<Test />} />
      </Routes>
    </themeContext.Provider>
  );
}
export const useAuth = () => useContext(themeContext);
export default App;
