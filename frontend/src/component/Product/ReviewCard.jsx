import React from "react";
// import { Rating } from "@smastrom/react-rating";
import { Rating } from "@mui/material";
import "./ProductDetails.css";

const ReviewCard = ({ review }) => {
  const link = "https://res.cloudinary.com/drd5i2llh/image/upload/v1743534986/avatars/grgofxzzv4ve4lt7xqnh.jpg"
  return (
    <div className="reviewCard">
      
      {/* <Avatar name="" size="30" round={true} /> */}
      <img src={link} alt="User" />
      <div className="reviewDetails">
        <p>{review.name}</p>
        <Rating
          value={review.rating }
          readOnly
          
        />
        <p className="reviewCardComment"> {review.comment} </p>
      </div>
    </div>
  );
};

export default ReviewCard;
