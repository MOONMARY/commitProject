import { data, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/header";
import ReviewContents from "../review_components/ReviewContent";
import { useAuth } from "../App";
import { useEffect, useState } from "react";
import ReviewModal from "../review_components/ReviewModal";

function Review() {
  const location = useLocation();
  const user = location.state.item || "";

  const { userSession } = useAuth();

  const [open, setOpen] = useState(false);
  const controllModal = () => {
    open ? setOpen(false) : setOpen(true);
  };

  let content = null;

  if (open === true) {
    content = (
      <ReviewModal
        controllModal={controllModal}
        addReview={addReview}
      ></ReviewModal>
    );
  } else if (open === false) {
    content = null;
  }

  const handleUpdateReview = (updatedReview) => {
    console.log("수정된 리뷰 데이터:", updatedReview); // 디버깅용 로그
    // setReview(updatedReview); // 상태 업데이트
  };

  // console.log(user);

  // useEffect(() => {
  //   fetchReviews();
  // }, []);

  // const fetchReviews = async () => {
  //   try {
  //     // const response = await fetch("data.json");
  //     const response = await fetch(apiUrl + "/api/review?id=" + userSession.id );
  //     if (!response.ok) {
  //       throw new Error("데이터를 받아오지 못했습니다.");
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //     setReviews(data);
  //   } catch (Error) {
  //     console.log(Error);
  //   }
  // };

  return (
    <>
      <ReviewContents user={user} controllModal={controllModal} />
      {content}
      {/* onSave={handleUpdateReview} */}
      <Footer />
    </>
  );
}
export default Review;
