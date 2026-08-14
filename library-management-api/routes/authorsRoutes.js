import express from "express";

import {
  getAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor
} from "../controllers/authorsController.js";

import { authenticate } from "../middleware/authenticate.js";

import {
  authorValidation,
  validateRequest
} from "../middleware/validation.js";

const router = express.Router();

// ==========================================
// GET ALL AUTHORS
// Public route
// GET /authors
// ==========================================

router.get("/", getAuthors);

// ==========================================
// GET SINGLE AUTHOR
// Public route
// GET /authors/:id
// ==========================================

router.get("/:id", getAuthor);

// ==========================================
// CREATE AUTHOR
// Protected + validated
// POST /authors
// ==========================================

router.post(
  "/",
  authenticate,
  authorValidation,
  validateRequest,
  createAuthor
);

// ==========================================
// UPDATE AUTHOR
// Protected + validated
// PUT /authors/:id
// ==========================================

router.put(
  "/:id",
  authenticate,
  authorValidation,
  validateRequest,
  updateAuthor
);

// ==========================================
// DELETE AUTHOR
// Protected
// DELETE /authors/:id
// ==========================================

router.delete(
  "/:id",
  authenticate,
  deleteAuthor
);

export default router;