/**
 * Middleware to validate task input data.
 * 
 * Validates the following fields:
 * - title: Required, must be a string, and must be between 3 and 100 characters.
 * - description: Optional, if provided must be a string and less than 500 characters.
 * - date: Optional, if provided must be a valid ISO 8601 date.
 * - done: Optional, if provided must be a boolean.
 * 
 * If validation fails, responds with a 400 status and a JSON object containing the validation errors.
 * If validation passes, proceeds to the next middleware.
 * 
 * @module taskValidator
 */

const { body, validationResult } = require("express-validator");


const taskValidator = [
  body("title")
    .notEmpty().withMessage("Title is required")
    .isString().withMessage("Title must be a string")
    .isLength({ min: 3, max: 100 }).withMessage("Title must be between 3 and 100 characters"),
  
  body("description")
    .optional()
    .isString().withMessage("Description must be a string")
    .isLength({ max: 500 }).withMessage("Description must be less than 500 characters"),

  body("date")
    .optional()
    .isISO8601().withMessage("Not a valid date"),

  body("done")
    .optional()
    .isBoolean().withMessage("Done must be a boolean"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { taskValidator };
