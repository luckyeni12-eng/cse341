import express from "express";
import passport from "passport";

import {
    register,
    login,
    logout,
    googleCallback
} from "../controllers/authController.js";

const router = express.Router();

// ==========================================
// REGISTER
// POST /auth/register
// ==========================================

router.post("/register", register);

// ==========================================
// LOGIN
// POST /auth/login
// ==========================================

router.post("/login", login);

// ==========================================
// LOGOUT
// POST /auth/logout
// ==========================================

router.post("/logout", logout);

// ==========================================
// GOOGLE OAUTH
// GET /auth/google
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
// ==========================================

router.get("/login-failed", (req, res) => {
    res.status(401).json({
        message: "Google OAuth login failed"
    });
});

export default router;