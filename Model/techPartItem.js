import mongoose from "mongoose";

const techPartItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    labelprice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TechPartItem = mongoose.model(
  "TechPartItem",
  techPartItemSchema
);

export default TechPartItem;