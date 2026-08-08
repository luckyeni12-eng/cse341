import {
body,
validationResult
}

from "express-validator";





export const bookValidation = [



body("title")

.notEmpty()

.withMessage(
"Title is required"
),



body("isbn")

.notEmpty()

.withMessage(
"ISBN is required"
),




body("author")

.notEmpty()

.withMessage(
"Author is required"
),




body("category")

.notEmpty()

.withMessage(
"Category is required"
),





body("publisher")

.notEmpty()

.withMessage(
"Publisher is required"
),




body("publicationYear")

.isNumeric()

.withMessage(
"Publication year must be numeric"
),




body("pages")

.isNumeric()

.withMessage(
"Pages must be numeric"
),




body("language")

.notEmpty()

.withMessage(
"Language is required"
),




body("available")

.isBoolean()

.withMessage(
"Available must be true or false"
)



];








export const validateRequest =
(req,res,next)=>{


const errors =
validationResult(req);



if(!errors.isEmpty()){


return res.status(400).json({

errors:errors.array()

});


}



next();



};






export const authorValidation = [



body("name")

.notEmpty()

.withMessage(
"Author name required"
),



body("email")

.isEmail()

.withMessage(
"Valid email required"
),




body("nationality")

.notEmpty()

.withMessage(
"Nationality required"
),




body("birthYear")

.isNumeric()

.withMessage(
"Birth year must be numeric"
),




body("biography")

.notEmpty()

.withMessage(
"Biography required"
)


];