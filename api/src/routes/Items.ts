import { Router } from "express";
import { Item } from "../models/Item.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../multer.js";
import { RequestWithUser } from "../types.js";

const itemsRouter = Router();

itemsRouter.get("/items", async (req, res, next) => {
  try {
    const categoryId = req.query.category;
    const filter: { category?: string } = {};

    if (categoryId && typeof categoryId === "string") {
      filter.category = categoryId;
    }

    const items = await Item.find(filter).populate("category", "name");
    return res.send(items);
  } catch (e) {
    return next(e);
  }
});

itemsRouter.get("/items/:id", async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate("category", "name")
      .populate("user", "displayName phoneNumber");

    if (!item) {
      return res.status(404).send({ error: "Item not found" });
    }

    return res.send(item);
  } catch (e) {
    return next(e);
  }
});

itemsRouter.post(
  "/items",
  auth,
  upload.single("image"),
  async (req: RequestWithUser, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      if (!req.file) {
        return res.status(400).send({ error: "Image is required" });
      }

      const { title, description, price, category } = req.body;

      if (!title || !description || !price || !category) {
        return res.status(400).send({ error: "All fields are required" });
      }

      const item = new Item({
        title,
        description,
        price: parseFloat(price),
        image: req.file.filename,
        category,
        user: req.user._id,
      });

      await item.save();
      return res.status(201).send(item);
    } catch (e) {
      return next(e);
    }
  },
);

itemsRouter.delete(
  "/items/:id",
  auth,
  async (req: RequestWithUser, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      const item = await Item.findById(req.params.id);

      if (!item) {
        return res.status(404).send({ error: "Item not found" });
      }

      if (item.user.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .send({ error: "Forbidden: this is not you're item" });
      }

      await Item.deleteOne({ _id: item._id });
      return res.send({ message: "Item deleted successfully" });
    } catch (e) {
      return next(e);
    }
  },
);

export default itemsRouter;
