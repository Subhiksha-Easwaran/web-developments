 const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/fullstackdevelopement")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", UserSchema);

app.post("/Register", async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  try {
    await User.create({ email, password: hash });
    res.json({ status: "ok", message: "User registered successfully" });
  } catch (err) {
    res.json({ status: "error", error: "Email already registered" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.json({ status: "error", error: "User not found" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    return res.json({ status: "ok", message: "Login successful" });
  } else {
    return res.json({ status: "error", error: "Invalid password" });
  }
});

app.listen(5000, () => console.log("Server started on port 5000"));
