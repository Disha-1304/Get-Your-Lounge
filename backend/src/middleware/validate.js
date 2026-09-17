/**
 * validate.js
 * ────────────────────────────────────────────────────────────
 * Validation error handler middleware for express-validator.
 * Formats errors as a consistent 400 response with field + message list.
 */

const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path || err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = validate;
