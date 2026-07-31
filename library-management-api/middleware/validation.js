import { body, validationResult } from "express-validator";



export const validateRequest = (req,res,next)=>{


    const errors = validationResult(req);



    if(!errors.isEmpty()){


        return res.status(400).json({

            errors: errors.array()

        });


    }



    next();

};




// BOOK VALIDATION

export const bookValidation = [

    body("title")
    .notEmpty()
    .withMessage("Title is required"),


    body("isbn")
    .notEmpty()
    .withMessage("ISBN is required"),


    body("author")
    .notEmpty()
    .withMessage("Author is required"),


    body("category")
    .notEmpty()
    .withMessage("Category is required"),


    body("publisher")
    .notEmpty()
    .withMessage("Publisher is required"),


    body("publicationYear")
    .isNumeric()
    .withMessage("Publication year must be a number"),


    body("pages")
    .isInt({min:1})
    .withMessage("Pages must be greater than 0")


];




// AUTHOR VALIDATION

export const authorValidation = [

    body("firstName")
    .notEmpty()
    .withMessage("First name is required"),


    body("lastName")
    .notEmpty()
    .withMessage("Last name is required"),


    body("birthYear")
    .isNumeric()
    .withMessage("Birth year must be a number"),


    body("country")
    .notEmpty()
    .withMessage("Country is required"),


    body("email")
    .isEmail()
    .withMessage("Valid email required")


];