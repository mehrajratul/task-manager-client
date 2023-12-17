import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ReviewCard = ({ review }) => {
  return (
    <div className="">
      <div className="bg-base-100 border border-red-400 shadow-sm my-4">
        <div className="card-body">
          <div className="border border-red-700 p-7">
            <h2 className="text-xl font-semibold">{review.name}</h2>
            <p className="text-xl">{review.comment}</p>
            <Rating
              style={{ maxWidth: 200 }}
              value={review.rating}
              readOnly
            ></Rating>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
