import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import usersRouter from "./routes/Users.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(usersRouter);

const run = async () => {
  await mongoose.connect("mongodb://localhost/requformdb");
  console.log("DB connected successfully");

  app.listen(port, () => {
    console.log(`Server start and listening at port ${port}`);
  });
};

run();
