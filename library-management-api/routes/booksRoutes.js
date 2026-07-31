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
// Protected route

router.get(
    "/",
    authenticate,
    getBooks
);



// GET SINGLE BOOK
// Protected route

router.get(
    "/:id",
    authenticate,
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

router.delete(
    "/:id",
    authenticate,
    deleteBook
);



export default router;