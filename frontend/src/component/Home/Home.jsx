import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./home.css";
import ProductCard from "./ProductCard.jsx";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction.jsx";
import Loader from "../layout/Loader/Loader.jsx";
import { toast } from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products} = useSelector(state => state.products);
  useEffect(() => {
    // if (error) {
    //   return toast.error(`${error} Not Found`)
    // }
      dispatch(getProduct("")).then(()=>toast.success("Products Loaded Successfully !")).catch(()=>toast.error(`Failed to Load Products!`));
  }, [dispatch,error]);
  return (
      <>
      {loading?(<Loader />):<>
      <MetaData title="ECHO" />
        <div className="banner">
        <p>Welcome to ECHO</p>
        <h1>Find Amazing Products Below</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
  {products && products.length > 0 ? (
    products.map((product) => (
      <ProductCard product={product} />
    ))
            
  ) : (
    <p>No products found.</p>
  )}
</div>
      </>}
      
      </>
  );
};

export default Home;
