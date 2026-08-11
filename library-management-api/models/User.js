import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: false
    },

    googleId: {
      type: String,
      required: false
    },

    name: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);