/**
 * validators.js
 * ────────────────────────────────────────────────────────────
 * Validation chains using express-validator for write operations.
 */

const { body, param } = require('express-validator');

// ── User Validation ──────────────────────────────────────────────────────────
const createUserValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('email is required')
    .isEmail().withMessage('Must be a valid email address'),
  body('name')
    .optional()
    .trim()
    .isString().withMessage('name must be a string'),
  body('phone')
    .optional()
    .trim()
    .isString().withMessage('phone must be a string'),
];

// ── Booking Validation ───────────────────────────────────────────────────────
const createBookingValidation = [
  body('loungeId')
    .trim()
    .notEmpty().withMessage('loungeId is required')
    .isString().withMessage('loungeId must be a string'),
  body('visitDate')
    .notEmpty().withMessage('visitDate is required')
    .isISO8601().withMessage('visitDate must be a valid ISO 8601 date string (e.g. 2025-08-01T10:00:00Z)')
    .custom((value) => {
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Allow today's date or future
      if (date < today) {
        throw new Error('visitDate must be today or in the future');
      }
      return true;
    }),
  body('numberOfGuests')
    .optional()
    .isInt({ min: 1 }).withMessage('numberOfGuests must be a positive integer (minimum 1)'),
  body('flightNumber')
    .optional()
    .trim()
    .isString().withMessage('flightNumber must be a string'),
];

const cancelBookingValidation = [
  param('id')
    .trim()
    .notEmpty().withMessage('Booking ID is required'),
];

const updateBookingStatusValidation = [
  param('id')
    .trim()
    .notEmpty().withMessage('Booking ID is required'),
  body('status')
    .notEmpty().withMessage('status is required')
    .isIn(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'])
    .withMessage('status must be one of PENDING, CONFIRMED, CANCELLED, or COMPLETED'),
];

// ── Lounge Validation ────────────────────────────────────────────────────────
const createLoungeValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Lounge name is required'),
  body('airportCode')
    .trim()
    .notEmpty().withMessage('airportCode is required')
    .isLength({ min: 2, max: 10 }).withMessage('airportCode must be between 2 and 10 characters'),
  body('city')
    .trim()
    .notEmpty().withMessage('city is required'),
  body('price')
    .optional()
    .isFloat({ min: 0 }).withMessage('price must be a non-negative number'),
  body('capacity')
    .optional()
    .isInt({ min: 1 }).withMessage('capacity must be a positive integer (minimum 1)'),
  body('country')
    .optional()
    .trim()
    .isString().withMessage('country must be a string'),
  body('type')
    .optional()
    .isIn(['DOMESTIC', 'INTERNATIONAL']).withMessage('type must be DOMESTIC or INTERNATIONAL'),
];

const updateLoungeValidation = [
  param('id')
    .trim()
    .notEmpty().withMessage('Lounge ID is required'),
  body('name')
    .optional()
    .trim()
    .notEmpty().withMessage('name cannot be empty'),
  body('price')
    .optional()
    .isFloat({ min: 0 }).withMessage('price must be a non-negative number'),
  body('capacity')
    .optional()
    .isInt({ min: 1 }).withMessage('capacity must be a positive integer (minimum 1)'),
  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
];

module.exports = {
  createUserValidation,
  createBookingValidation,
  cancelBookingValidation,
  updateBookingStatusValidation,
  createLoungeValidation,
  updateLoungeValidation,
};
