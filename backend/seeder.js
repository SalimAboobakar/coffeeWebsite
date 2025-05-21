// backend/seeder.js
require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

const seed = async () => {
  // 1) Connect to MongoDB
  await connectDB();

  // 2) Wipe out existing collections
  await User.deleteMany();
  await Product.deleteMany();
  await Order.deleteMany();

  // 3) Seed users
  const adminPass = await bcrypt.hash("adminpass", 10);
  const userPass = await bcrypt.hash("userpass", 10);

  await User.create({
    name: "Admin User",
    email: "admin@example.com",
    password: adminPass,
    role: "admin",
  });

  await User.create({
    name: "Regular User",
    email: "user@example.com",
    password: userPass,
    // role defaults to 'user'
  });

  // 4) Seed products
  const products = await Product.insertMany([
    { name: "Espresso", price: 2.5, description: "Strong and black." },
    { name: "Cappuccino", price: 3.5, description: "With steamed milk." },
    { name: "Latte", price: 4.0, description: "Soft and milky." },
    { name: "Mocha", price: 4.5, description: "Chocolate-flavored." },
  ]);

  // 5) Sample order
  await Order.create({
    user: products[0] /* replace with real user._id if needed */,
    items: [
      { product: products[0]._id, quantity: 2 },
      { product: products[2]._id, quantity: 1 },
    ],
    total: products[0].price * 2 + products[2].price,
  });

  console.log("✅ Data seeded!");
  process.exit();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
