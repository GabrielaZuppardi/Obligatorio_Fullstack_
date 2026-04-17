import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300
    },
    ingredients: {
      type: [String],
      required: true
    },
    steps: {
      type: [String],
      required: true
    },
    preparationTime: {
      type: Number,
      required: true,
      min: 1
    },
    difficulty: {
      type: String,
      enum: ["facil", "media", "dificil"],
      required: true
    },
    servings: {
      type: Number,
      required: true,
      min: 1
    },
    imageUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
);