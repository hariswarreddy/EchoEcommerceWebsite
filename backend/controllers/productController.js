import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { Product } from "../models/productModel.js";
import apiFeatures from "../utils/apiFeatures.js";
import ErrorHandler from "../utils/errorhandler.js";
import cloudinary from "cloudinary";

// creating Product -- Admin
export const createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = req.body.images || [];
    if (typeof images === "string") {
      images = [images]; // Convert single image to array
    }

    let imagesLinks = [];

    for (const base64 of images) {
      const result = await cloudinary.v2.uploader.upload(base64, {
        folder: "products",
        resource_type: "image",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: "true",
    product,
  });
});
// Get All Products
export const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultsPerPage = 8;
  const productCount = await Product.countDocuments();
  const apiFeature = new apiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query.clone();
  let filteredProductsCount = products.length;
  apiFeature.pagination(resultsPerPage);

  products = await apiFeature.query;
  res.status(200).json({
    success: "true",
    products,
    productCount,
    resultsPerPage,
    filteredProductsCount,
  });
});

// Get All Products -- ADMIN Route
export const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: "true",
    products,
  });
});

// Get Product Details
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Updating Products --Admin

export const updateProduct = catchAsyncErrors(async (req, res,next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 500));
  }
  // Images Start Here
  let images =  [];

  if (req.body.images) {
    if (typeof req.body.images === "string") {
      images = [req.body.images]; // Convert single string to an array
    } else if (Array.isArray(req.body.images)) {
      images = req.body.images; // Keep as array
    } else {
      return next(new ErrorHandler("Invalid images format", 400)); // Handle invalid formats
    }
  }
  // Delete old images from Cloudinary
  if (product.images && product.images.length > 0) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
  }

  // Upload new images if provided
  const imagesLinks = [];
  for (const base64 of images) {
    try {
      const result = await cloudinary.v2.uploader.upload(base64, {
        folder: "products",
        resource_type: "auto",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } catch (error) {
      return next(new ErrorHandler("Image upload failed", 500));
    }
  }

  if (imagesLinks.length > 0) {
    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: "true",
    product,
  });
});

// Delete Product --Admin

export const deleteProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 500));
  }

  product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: "true",
    message: "Product Deleted Successfully",
  });
});

// Creating a review or Updating a review

export const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    success: true,
    message: "Review Created or Updated Succesfully",
  });
});

// Get All Reviews of a Product
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review of a Product
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  const reviews = product.reviews.filter((rev) => {
    rev._id.toString() !== req.query.id.toString();
  });

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const ratings = reviews.length > 0 ? avg / reviews.length : 0;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      numOfReviews,
      ratings: ratings,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Review Deleted Successfully",
  });
});
