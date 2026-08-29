import { Router } from "express";
import { Category } from "../models/Category.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.send(categories);
  } catch (e) {
    return next(e);
  }
});

export default categoriesRouter;
