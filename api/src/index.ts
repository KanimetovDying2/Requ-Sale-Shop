import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import usersRouter from "./routes/Users.js";
import categoriesRouter from "./routes/Categories.js";
import itemsRouter from "./routes/Items.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(usersRouter);
app.use(categoriesRouter);
app.use(itemsRouter);

const run = async () => {
  await mongoose.connect("mongodb://localhost/requsaleshop");
  console.log("DB connected successfully");

  app.listen(port, () => {
    console.log(`Server start and listening at port ${port}`);
  });
};

run().catch((err) => console.error(err));
