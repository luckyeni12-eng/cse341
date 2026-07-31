import express from "express";

import {

    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook

} from "../controllers/booksController.js";


const router = express.Router();



// GET ALL BOOKS

router.get("/", getBooks);



// GET SINGLE BOOK

router.get("/:id", getBook);



// CREATE BOOK

router.post("/", createBook);



// UPDATE BOOK

router.put("/:id", updateBook);



// DELETE BOOK

router.delete("/:id", deleteBook);



export default router;