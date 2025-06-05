import { body } from "express-validator";


export const registrationValidation = [

    body('userName')
        .notEmpty().withMessage("Username is required.")
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long.")
        .trim()
        .isAlpha().withMessage("Username must contain only letters.")
        .custom(value => {
            if (value === 'admin') {
                throw new Error('Username "admin" is not allowed.')
            }
            return true
        })
        .customSanitizer(value => value.toLowerCase()),

    body('userEmail')
        .isEmail().withMessage("Please provide a valid Email Id.")
        .normalizeEmail(),

    body('userPass')
        .isLength({ min: 5, max: 10 }).withMessage("Password must be between 5 and 10 character long.")
        .isStrongPassword().withMessage('Password must be strong.'),

    body('userAge')
        .isNumeric().withMessage("Age must be numeric.")
        .isInt({ min: 18 }).withMessage("Age must be at least 18+ years old."),

    body('userCity')
        .isIn(['Delhi', 'Mumbai', 'Goa', 'Agra',])
        .withMessage("City must be Delhi, Mumbai, Goa or Agra.")
];