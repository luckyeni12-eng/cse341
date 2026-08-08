import express from "express";


import {


getAuthors,

getAuthor,

createAuthor,

updateAuthor,

deleteAuthor


}

from "../controllers/authorsController.js";



import {

authenticate

}

from "../middleware/authenticate.js";



const router = express.Router();






// GET ALL AUTHORS


router.get(

"/",

getAuthors

);







// GET SINGLE AUTHOR


router.get(

"/:id",

getAuthor

);







// CREATE AUTHOR


router.post(

"/",

authenticate,

createAuthor

);







// UPDATE AUTHOR


router.put(

"/:id",

authenticate,

updateAuthor

);







// DELETE AUTHOR


router.delete(

"/:id",

authenticate,

deleteAuthor

);






export default router;