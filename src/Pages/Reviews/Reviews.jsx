import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch(`https://task-manager-server-blue.vercel.app/review`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReviews(data);
      });
  }, []);

  return (
    <div className="mx-8 my-9">
      {reviews.map((review) => (
        <ReviewCard key={review._id} review={review}></ReviewCard>
      ))}
      <div className="text-center">
        <button className="btn btn-primary">
          <Link to="/review/addreview">Add Review</Link>
        </button>
      </div>
    </div>
  );
};

export default Reviews;
