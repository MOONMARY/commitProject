import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/header";
import ReviewsContent from "../review_components/ReviewsContent";

function Reviews() {
  const apiUrl = "http://localhost:8927/api/review";

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      // const response = await fetch("data.json");
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }

      const data = await response.json();
      console.log(data);
      setReviews(data);
    } catch (Error) {
      console.log(Error);
    }
  };

  return (
    <>
      <ReviewsContent reviews={reviews} />
      <Footer />
    </>
  );
}
export default Reviews;
