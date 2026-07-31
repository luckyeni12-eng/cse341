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




// GET ALL AUTHORS

router.get(
    "/",
    authenticate,
    getAuthors
);




// GET SINGLE AUTHOR

router.get(
    "/:id",
    authenticate,
    getAuthor
);




// CREATE AUTHOR

router.post(

    "/",

    authenticate,

    authorValidation,

    validateRequest,

    createAuthor

);




// UPDATE AUTHOR

router.put(

    "/:id",

    authenticate,

    authorValidation,

    validateRequest,

    updateAuthor

);




// DELETE AUTHOR

router.delete(

    "/:id",

    authenticate,

    deleteAuthor

);



export default router;