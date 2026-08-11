import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    author: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    publisher: {
      type: String,
      required: true,
      trim: true
    },

    publicationYear: {
      type: Number,
      required: true
    },

    pages: {
      type: Number,
      required: true,
      min: 1
    },

    language: {
      type: String,
      required: true,
      trim: true
    },

    available: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Book", bookSchema);