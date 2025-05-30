import axios from "axios";
import {
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  CLEAR_ERRORS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  NEW_PRODUCT_SUCCESS,
} from "../constants/productConstants";
import API_URL from "../config";


const options = {
  withCredentials: true
};
// Get Products with Conditions filtered
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 200000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      let link = `${API_URL}/api/v1/products/?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (category) {
        link = `${API_URL}/api/v1/products/?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      let { data } = await axios.get(link,options);
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
    };
  
// Get All Products -- ADMIN
export const getAdminProducts = () => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_PRODUCT_REQUEST });
      const { data } = await axios.get(`${API_URL}/api/v1/admin/products`,options);
      dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data.products });
      
    } catch (error) {
      dispatch({ type: ADMIN_PRODUCT_FAIL, payload: error.response.message });
    }
  }


// Create Product
export const createProduct = (productData) => async (dispatch) => { 
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },withCredentials: true
    };
    const { data } = await axios.post(`${API_URL}/api/v1/admin/product/new`, productData, config);
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
}

// Update Product
export const updateProduct = (id,productData) => async (dispatch) => { 
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },withCredentials: true
    };
    const { data } = await axios.put(`${API_URL}/api/v1/admin/product/${id}`, productData, config);
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
}

// Delete Product
export const deleteProduct = (id) => async (dispatch) => { 
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    
    const { data } = await axios.delete(`${API_URL}/api/v1/admin/product/${id}`,options);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
}

// Get Product Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/v1/product/${id}`,options);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Add Review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },withCredentials: true
    };
    const { data } = await axios.put(`${API_URL}/api/v1/review`, reviewData, config);
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/v1/reviews?id=${id}`,options);
    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId,productId) => async (dispatch) => { 
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });
    
    const { data } = await axios.delete(`${API_URL}/api/v1/reviews?id=${reviewId}&productId=${productId}`,options);
    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
}

// used for clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
