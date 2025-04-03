import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { Rating } from "@mui/material";
import MetaData from "../layout/MetaData";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
// import { Rating as muiRating } from "@mui/material";
import Loader from "../layout/Loader/Loader";
import ReviewCard from "./ReviewCard.jsx";
import { toast, Toaster } from "react-hot-toast";
import { addItemsToCart } from "../../actions/cartAction.jsx";
import { NEW_REVIEW_RESET } from "../../constants/productConstants.jsx";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(state => state.newReview);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    const qnty = quantity + 1;
    setQuantity(qnty);
  };
  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qnty = quantity - 1;
    setQuantity(qnty);
  };
  
  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Items Added to cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const submitReviewHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setOpen(false);
  };
  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      <Toaster />;
    }
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error,success,reviewError]);

  
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={product.name} />

          <div className="ProductDetails">
            <div className="carousel">
              <Carousel
                showArrows={false}
                showThumbs={false}
                showStatus={false}
                autoPlay
                infiniteLoop
                interval={2000}
                stopOnHover={true}
                emulateTouch={true}
                dynamicHeight={true}
                width="20vmax"
              >
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2> {product.name} </h2>
                <p>Product #{product._id} </p>
              </div>
              <div className="detailsBlock-2">
                <Rating
                  value={product.ratings}
                  readOnly
                  //   style={{ maxWidth: 100 }}
                  //   // itemStyles={{
                  //   //   itemStrokeWidth: 0, // Removes the star border
                  //   //   itemStrokeColor: "transparent", // Ensures no visible stroke
                  //   // }}
                  // // halfFillMode="svg"
                />
                <span className="detailsBlock-2-span"> ({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>&#8377;{product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <p className="status">
                Status:
                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                  {product.stock < 1 ? "Out of Stock" : "In Stock"}
                </b>
              </p>
              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
            <h3 className="reviewsHeading">Reviews</h3>
           
              <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
              >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                  <Rating
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large"
                  />
                  <textarea
                    className="submitDialogTextArea"
                    rows="5"
                    cols="25"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </DialogContent>
                <DialogActions>
                  <Button onClick={submitReviewToggle} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={submitReviewHandler} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
          {product.reviews && product.reviews[0] ? (
             <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard key={review._id} review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
