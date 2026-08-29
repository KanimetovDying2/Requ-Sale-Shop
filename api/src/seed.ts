import mongoose from "mongoose";
import { User } from "./models/User.js";
import { Category } from "./models/Category.js";
import { Item } from "./models/Item.js";
import crypto from "crypto";

const run = async () => {
  await mongoose.connect("mongodb://localhost/requsaleshop");
  const db = mongoose.connection;

  try {
    await db.dropCollection("users");
    await db.dropCollection("categories");
    await db.dropCollection("items");
  } catch (e) {
    console.log("Collections were not found, skipping drop...");
  }

  const computers = await Category.create({ name: "Computers" });
  const cars = await Category.create({ name: "Cars" });
  const phones = await Category.create({ name: "Phones" });
  const other = await Category.create({ name: "Other" });

  const user1 = new User({
    username: "kyro",
    password: "001",
    displayName: "baiteli",
    phoneNumber: "+996 555 111 222",
    token: crypto.randomUUID(),
  });
  await user1.save();

  const user2 = new User({
    username: "jane",
    password: "123",
    displayName: "Jane Smith",
    phoneNumber: "+996 777 333 444",
    token: crypto.randomUUID(),
  });
  await user2.save();

  await Item.create([
    {
      title: "MacBook Pro 16",
      description: "Powerful laptop in great condition",
      price: 1200,
      image: "uploads/laptop.JPG",
      category: computers._id,
      user: user1._id,
    },
    {
      title: "BMW E30",
      description: "Classic retro car, needs some work",
      price: 3500,
      image: "uploads/car.JPG",
      category: cars._id,
      user: user1._id,
    },
    {
      title: "iPhone 13",
      description: "128GB, like new, battery health 90%",
      price: 500,
      image: "uploads/phone.JPG",
      category: phones._id,
      user: user2._id,
    },
    {
      title: "Old Bicycle",
      description: "Good for riding in the park",
      price: 80,
      image: "uploads/bike.JPG",
      category: other._id,
      user: user2._id,
    },
  ]);

  await mongoose.connection.close();
  console.log("Fixtures seeded successfully!");
};

run().catch((err) => {
  console.error(err);
  mongoose.connection.close();
});
