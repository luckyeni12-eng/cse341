import express from "express";

import {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember
} from "../controllers/membersController.js";

import { authenticate } from "../middleware/authenticate.js";

import {
  memberValidation,
  validateRequest
} from "../middleware/validation.js";

const router = express.Router();

// ==========================================
// GET ALL MEMBERS
// Public route
// GET /members
// ==========================================

router.get("/", getMembers);

// ==========================================
// GET SINGLE MEMBER
// Public route
// GET /members/:id
// ==========================================

router.get("/:id", getMember);

// ==========================================
// CREATE MEMBER
// Protected + validated
// POST /members
// ==========================================

router.post(
  "/",
  authenticate,
  memberValidation,
  validateRequest,
  createMember
);

// ==========================================
// UPDATE MEMBER
// Protected + validated
// PUT /members/:id
// ==========================================

router.put(
  "/:id",
  authenticate,
  memberValidation,
  validateRequest,
  updateMember
);

// ==========================================
// DELETE MEMBER
// Protected
// DELETE /members/:id
// ==========================================

router.delete(
  "/:id",
  authenticate,
  deleteMember
);

export default router;