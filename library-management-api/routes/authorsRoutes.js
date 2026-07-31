import express from "express";

import {
    getAuthors,
    getAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor
} from "../controllers/authorsController.js";


const router = express.Router();


// GET ALL AUTHORS
router.get("/", getAuthors);


// GET SINGLE AUTHOR
router.get("/:id", getAuthor);


// CREATE AUTHOR
router.post("/", createAuthor);


// UPDATE AUTHOR
router.put("/:id", updateAuthor);


// DELETE AUTHOR
router.delete("/:id", deleteAuthor);


// Export router
export default router;