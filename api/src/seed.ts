import mongoose from "mongoose";
import { User } from "./models/User.js";
import { randomUUID } from "crypto";

const run = async () => {
  await mongoose.connect("mongodb://localhost/requsaledb");
  const db = mongoose.connection;

  try {
  } catch (e) {
    console.log("Collections are empty or not found, skipping drops.");
  }

  const user1 = new User({
    username: "baiteli",
    password: "kyro",
    token: randomUUID(),
  });
  await user1.save();

  const user2 = new User({
    username: "alice",
    password: "password123",
    token: randomUUID(),
  });
  await user2.save();

  console.log("Full fixtures created successfully!");
  await mongoose.connection.close();
};

run().catch((err) => {
  console.error("Error running fixtures:", err);
  mongoose.connection.close();
});
