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

// GET ALL AUTHORS (Public)
router.get(
    "/",
    getAuthors
);

// GET SINGLE AUTHOR (Public)
router.get(
    "/:id",
    getAuthor
);

// CREATE AUTHOR (Protected)
router.post(
    "/",
    authenticate,
    authorValidation,
    validateRequest,
    createAuthor
);

// UPDATE AUTHOR (Protected)
router.put(
    "/:id",
    authenticate,
    authorValidation,
    validateRequest,
    updateAuthor
);

// DELETE AUTHOR (Protected)
router.delete(
    "/:id",
    authenticate,
    deleteAuthor
);

export default router;