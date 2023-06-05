import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import "../userDetails.js";

const User = mongoose.model("UserInfo");

const registerRouter = async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const oldEmail = await User.findOne({ email });
    const oldUsername = await User.findOne({ username });

    if (oldUsername) {
      return res.status(404).json({ message: "Username already exists" });
    } else if (oldEmail) {
      return res.status(404).json({ message: "Email already exists" });
    }
    await User.create({
      username: username,
      email: email,
      password: encryptedPassword,
      isAdmin: isAdmin,
    });
    res.status(200).json({ message: "Registered Correctly" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const loginRouter = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(500).json({ message: "User not found" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {});

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ status: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
};

const userDataRouter = async (req, res) => {
  const { token } = req.body;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
      if (err) {
        return "Token expired";
      }
      return res;
    });

    if (user == "Token expired") {
      return res.send({ status: "error", data: "Token expired" });
    }

    const useremail = user.email;

    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", error: error });
      });
  } catch (error) {}
};

export { registerRouter, loginRouter, userDataRouter };
