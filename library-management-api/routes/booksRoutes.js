import express from "express";

import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} from "../controllers/booksController.js";

import { authenticate } from "../middleware/authenticate.js";

import {
  bookValidation,
  validateRequest
} from "../middleware/validation.js";

const router = express.Router();

// ==========================================
// GET ALL BOOKS
// Public route
// GET /books
// ==========================================

router.get("/", getBooks);

// ==========================================
// GET ONE BOOK
// Public route
// GET /books/:id
// ==========================================

router.get("/:id", getBook);

// ==========================================
// CREATE BOOK
// Protected + validated
// POST /books
// ==========================================

router.post(
  "/",
  authenticate,
  bookValidation,
  validateRequest,
  createBook
);

// ==========================================
// UPDATE BOOK
// Protected + validated
// PUT /books/:id
// ==========================================

router.put(
  "/:id",
  authenticate,
  bookValidation,
  validateRequest,
  updateBook
);

// ==========================================
// DELETE BOOK
// Protected
// DELETE /books/:id
// ==========================================

router.delete(
  "/:id",
  authenticate,
  deleteBook
);

export default router;