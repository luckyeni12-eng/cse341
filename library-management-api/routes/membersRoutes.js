import express from "express";

import {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember
} from "../controllers/membersController.js";

import {
  authenticate
} from "../middleware/authenticate.js";

import {
  memberValidation,
  validateRequest
} from "../middleware/validation.js";

const router = express.Router();


// GET ALL MEMBERS
// Public route

router.get(
  "/",
  getMembers
);


// GET SINGLE MEMBER
// Public route

router.get(
  "/:id",
  getMember
);


// CREATE MEMBER
// Protected + validated

router.post(
  "/",
  authenticate,
  memberValidation,
  validateRequest,
  createMember
);


// UPDATE MEMBER
// Protected + validated

router.put(
  "/:id",
  authenticate,
  memberValidation,
  validateRequest,
  updateMember
);


// DELETE MEMBER
// Protected

router.delete(
  "/:id",
  authenticate,
  deleteMember
);


export default router;