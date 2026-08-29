import { Schema, model } from "mongoose";
import { CategoryFields } from "../types.js";

const CategorySchema = new Schema<CategoryFields>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Category = model<CategoryFields>("Category", CategorySchema);
