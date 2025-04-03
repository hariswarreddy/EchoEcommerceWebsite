// name , description, price , rating, images, category, stock, numOfReviews, reviews,createdAt

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter the Name of Product"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter the Description of Product"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter the Price of Product"],
    maxLength: [8, "Price Cannot exceed 10000000"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Enter the category of the product"],
  },
  stock: {
    type: Number,
    required: [true, "Enter the Product Stock"],
    maxLength: [4, "Stock Cannot Exceeded 10000"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Product = mongoose.model("Product", productSchema);
