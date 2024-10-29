const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const router = express.Router();

//Register new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing_user = await User.findOne({ username });
    if (existing_user) {
      return res.status(409).json({ message: "Username Already Exists" });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const new_user = new User({ username, password: hashed_password });

    await new_user.save();
    res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET
    //    {
    //   expiresIn: "10h",
    // }
  );
  res.status(200).json({ token });
});

module.exports = router;
