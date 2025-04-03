import React from "react";
import { Link } from "react-router-dom";
// import { Rating} from '@smastrom/react-rating';
// import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      {/* <div>
        <Rating
          value={product.ratings}
          readOnly
          size="large"
          sx={{ fontSize: "1.5rem !important" }}
        />
        <span> ({product.numOfReviews} Reviews)</span>
      </div> */}
      <span>&#8377;{product.price}</span>
      <p>Free Delivery</p>
    </Link>
  );
};

export default ProductCard;
