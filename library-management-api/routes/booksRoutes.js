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


// GET ALL BOOKS
// Public route
router.get(
    "/",
    getBooks
);


// GET SINGLE BOOK
// Public route
router.get(
    "/:id",
    getBook
);


// CREATE BOOK
// Protected + Validation
router.post(
    "/",
    authenticate,
    bookValidation,
    validateRequest,
    createBook
);


// UPDATE BOOK
// Protected + Validation
router.put(
    "/:id",
    authenticate,
    bookValidation,
    validateRequest,
    updateBook
);


// DELETE BOOK
// Protected
router.delete(
    "/:id",
    authenticate,
    deleteBook
);


export default router;