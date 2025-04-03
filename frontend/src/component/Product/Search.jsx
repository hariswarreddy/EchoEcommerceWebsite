import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";
import {FaSearch} from "react-icons/fa"
import MetaData from "../layout/MetaData";

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`)
        }
        else {
            navigate('/products')
        }
    }
  return (
    <>
      <MetaData title={"Search -- ECHO"} />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search for a Product..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button><FaSearch size={30}/></button>
      </form>
    </>
  );
};

export default Search;
