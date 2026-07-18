const { body } = require("express-validator");

exports.registerValidation = [

  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full Name is required")
    .isLength({ min: 3 }),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid Email"),

  body("phone")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Invalid Phone Number"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("One uppercase letter required")
    .matches(/[a-z]/)
    .withMessage("One lowercase letter required")
    .matches(/[0-9]/)
    .withMessage("One number required")
    .matches(/[@$!%*?&]/)
    .withMessage("One special character required"),

];