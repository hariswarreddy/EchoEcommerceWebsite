import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard";
import "./products.css";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Typography, Slider } from "@mui/material";
import { toast, Toaster } from "react-hot-toast";
import MetaData from "../layout/MetaData";

const categories = [
  "Laptops",
  "FootWear",
  "Clothes",
  "Tops",
  "Attires",
  "Camera",
  "Smartphones",
  "Shoes",
  "Sandals",
]

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 200000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const { products, loading, error, resultsPerPage ,filteredProductsCount} = useSelector(
    (state) => state.products
  );


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct( keyword || "", currentPage,price,category,ratings));
  }, [dispatch, keyword, currentPage,price,category,ratings,error]);


  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  }
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected+1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let count = filteredProductsCount;
  return (
    <>
      {loading ? (
        <Loader />
       
      ) : (
          <>
            <Toaster />
          <MetaData title={"Products -- ECHO"} />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}

            </div>
            <div className="filterBox">
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                // onChangeCommitted={priceHandler} 
                min={0}
                max={200000}

                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                step={10}
                // isRtl={false}
                style={{ pointerEvents: "auto" }}
              />

              <Typography >Categories</Typography>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li className="category-link"
                  key={category}
                  onClick={()=>setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <fieldset>
               <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={ratings}
                  min={0}
                  max={5}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  onChange={(e,newRating)=>setRatings(newRating)}
                />
                

              </fieldset>
            </div>

          {resultsPerPage<count && (
            <div >
              <ReactPaginate
                previousLabel={"Prev"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={Math.ceil(count/resultsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
                activeLinkClassName={"active-link"}
                forcePage={currentPage - 1} // Ensure current page is highlighted
                disableInitialCallback={false}
                />
                {/* <div className="productCount">Total Products: {productCount}</div> */}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
