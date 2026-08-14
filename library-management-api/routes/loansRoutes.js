import express from "express";

import {
  getLoans,
  getLoan,
  createLoan,
  updateLoan,
  deleteLoan
} from "../controllers/loansController.js";

import { authenticate } from "../middleware/authenticate.js";

import {
  loanValidation,
  validateRequest
} from "../middleware/validation.js";

const router = express.Router();

// ==========================================
// GET ALL LOANS
// Public route
// GET /loans
// ==========================================

router.get("/", getLoans);

// ==========================================
// GET SINGLE LOAN
// Public route
// GET /loans/:id
// ==========================================

router.get("/:id", getLoan);

// ==========================================
// CREATE LOAN
// Protected + validated
// POST /loans
// ==========================================

router.post(
  "/",
  authenticate,
  loanValidation,
  validateRequest,
  createLoan
);

// ==========================================
// UPDATE LOAN
// Protected + validated
// PUT /loans/:id
// ==========================================

router.put(
  "/:id",
  authenticate,
  loanValidation,
  validateRequest,
  updateLoan
);

// ==========================================
// DELETE LOAN
// Protected
// DELETE /loans/:id
// ==========================================

router.delete(
  "/:id",
  authenticate,
  deleteLoan
);

export default router;