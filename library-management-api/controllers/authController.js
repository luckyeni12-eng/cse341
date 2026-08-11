import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ==========================================
// REGISTER
// POST /auth/register
// ==========================================

export async function register(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    return res.status(201).json({
      message: "User registered successfully"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
}

// ==========================================
// LOGIN
// POST /auth/login
// ==========================================

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (!user.password) {
      return res.status(400).json({
        message: "This account uses Google OAuth. Please use Google login."
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT secret is not configured"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
}

// ==========================================
// LOGOUT
// POST /auth/logout
// ==========================================

export async function logout(req, res) {
  try {
    return res.status(200).json({
      message: "Logout successful. Remove the token from the client."
    });
  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
      error: error.message
    });
  }
}

// ==========================================
// GOOGLE OAUTH CALLBACK
// GET /auth/google/callback
// ==========================================

export async function googleCallback(req, res) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Google authentication failed"
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT secret is not configured"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    return res.status(200).json({
      message: "Google OAuth login successful",
      token
    });
  } catch (error) {
    return res.status(500).json({
      message: "OAuth login failed",
      error: error.message
    });
  }
}