import {
  body,
  validationResult
} from "express-validator";


// -----------------------------
// BOOK VALIDATION
// -----------------------------

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
    .isInt()
    .withMessage("Publication year must be an integer"),

  body("pages")
    .isInt({ min: 1 })
    .withMessage("Pages must be a positive integer"),

  body("language")
    .notEmpty()
    .withMessage("Language is required"),

  body("available")
    .isBoolean()
    .withMessage("Available must be true or false")
];


// -----------------------------
// AUTHOR VALIDATION
// -----------------------------

export const authorValidation = [
  body("name")
    .notEmpty()
    .withMessage("Author name is required"),

  body("email")
    .isEmail()
    .withMessage("A valid email is required"),

  body("nationality")
    .notEmpty()
    .withMessage("Nationality is required"),

  body("birthYear")
    .isInt()
    .withMessage("Birth year must be an integer"),

  body("biography")
    .notEmpty()
    .withMessage("Biography is required")
];


// -----------------------------
// MEMBER VALIDATION
// -----------------------------

export const memberValidation = [
  body("name")
    .notEmpty()
    .withMessage("Member name is required"),

  body("email")
    .isEmail()
    .withMessage("A valid email is required"),

  body("phone")
    .notEmpty()
    .withMessage("Phone is required"),

  body("membershipType")
    .isIn(["standard", "premium", "student"])
    .withMessage("Invalid membership type"),

  body("joinDate")
    .isISO8601()
    .withMessage("Join date must be a valid date"),

  body("address")
    .notEmpty()
    .withMessage("Address is required"),

  body("active")
    .isBoolean()
    .withMessage("Active must be true or false")
];


// -----------------------------
// LOAN VALIDATION
// -----------------------------

export const loanValidation = [
  body("member")
    .isMongoId()
    .withMessage("Valid member ID is required"),

  body("book")
    .isMongoId()
    .withMessage("Valid book ID is required"),

  body("loanDate")
    .isISO8601()
    .withMessage("Loan date must be a valid date"),

  body("dueDate")
    .isISO8601()
    .withMessage("Due date must be a valid date"),

  body("status")
    .isIn(["borrowed", "returned", "overdue"])
    .withMessage("Invalid loan status"),

  body("fine")
    .isFloat({ min: 0 })
    .withMessage("Fine must be zero or greater")
];


// -----------------------------
// VALIDATION ERROR HANDLER
// -----------------------------

export function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array()
    });
  }

  next();
}