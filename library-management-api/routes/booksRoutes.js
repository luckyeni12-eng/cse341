import express from "express";


import {

getBooks,

getBook,

createBook,

updateBook,

deleteBook


} from "../controllers/booksController.js";


import {

authenticate

} from "../middleware/authenticate.js";



import {

bookValidation,

validateRequest

} from "../middleware/validation.js";



const router = express.Router();





// GET ALL BOOKS

router.get(

"/",

getBooks

);






// GET ONE BOOK


router.get(

"/:id",

getBook

);






// CREATE BOOK


router.post(

"/",

authenticate,

bookValidation,

validateRequest,

createBook

);






// UPDATE BOOK


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