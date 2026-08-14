import express from "express";
import passport from "passport";

import {
  register,
  login,
  logout,
  googleCallback
} from "../controllers/authController.js";

import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

// ==========================================
// REGISTER
// POST /auth/register
// Public
// ==========================================

router.post("/register", register);

// ==========================================
// LOGIN
// POST /auth/login
// Public
// ==========================================

router.post("/login", login);

// ==========================================
// LOGOUT
// POST /auth/logout
// Protected
// ==========================================

router.post(
  "/logout",
  authenticate,
  logout
);

// ==========================================
// GOOGLE OAUTH
// GET /auth/google
// Public
// ==========================================

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// ==========================================
// GOOGLE OAUTH CALLBACK
// GET /auth/google/callback
// Public OAuth callback
// ==========================================

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/login-failed"
  }),
  googleCallback
);

// ==========================================
// GOOGLE LOGIN FAILURE
// GET /auth/login-failed
// Public
// ==========================================

router.get("/login-failed", (req, res) => {
  return res.status(401).json({
    message: "Google OAuth login failed"
  });
});

export default router;