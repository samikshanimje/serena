import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// Register

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });

    if (existing)
      return res.status(400).json({
        message: "User already exists",
      });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(201).json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    const valid = await bcrypt.compare(password, user.password);

    if (!valid)
      return res.status(401).json({
        message: "Invalid password",
      });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.json({
      success: true,
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const email = payload.email;
    const name = payload.name;
    const avatar = payload.picture;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: "GOOGLE_ACCOUNT",
        avatar,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const { password, ...userWithoutPassword } = user.toObject();

    res.json({
      success: true,
      token,
      user: userWithoutPassword,
    });

  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Google login failed",
    });
  }
};