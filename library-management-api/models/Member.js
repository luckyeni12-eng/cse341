import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    membershipType: {
      type: String,
      required: true,
      enum: ["standard", "premium", "student"]
    },

    joinDate: {
      type: Date,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    active: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Member", memberSchema);