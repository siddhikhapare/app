const express = require('express');
const router = express.Router();
const formController = require('../controllers/formcontroller.js');
const { verifyToken } = require("../controllers/authController");

// router.get('/', formController.getAllForms);

// // Extend with more routes like
// router.get('/:id', formController.getFormById);
// router.post('/', formController.createForm);
// router.put('/:id', formController.updateForm);
// router.delete('/:id', formController.deleteForm);

// //formresponseroutes -
// //POST submit form response
// router.post('/:id/responses',formController.submitFormResponse)
// // GET all responses for a form
// router.get(':id/responses', formController.getAllResponses)
// //get single response
// router.get('/responses/:id', formController.getSingleResponse)

//write error handling for each routes
//use winston npm package for logging routes as per production
// Middleware to handle errors globally
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  const message = err.message || 'Something went wrong';
  res.status(err.status || 500).json({
    success: false,
    error: message,
  });
};

//auth routes
router.post("/login", verifyToken.loginUser);
//router.post("/register", registerUser);

// GET all forms
router.get('/', async (req, res, next) => {
  try {
    await formController.getAllForms(req, res);
  } catch (err) {
    next(err); // Pass error to the errorHandler middleware
  }
});

// GET single form by ID
router.get('/:id', async (req, res, next) => {
  try {
    await formController.getFormById(req, res);
  } catch (err) {
    next(err);
  }
});

// POST create new form
router.post('/', async (req, res, next) => {
  try {
    await formController.createForm(req, res);
  } catch (err) {
    next(err);
  }
});

// PUT update form
router.put('/:id', async (req, res, next) => {
  try {
    await formController.updateForm(req, res);
  } catch (err) {
    next(err);
  }
});

// DELETE form
router.delete('/:id', async (req, res, next) => {
  try {
    await formController.deleteForm(req, res);
  } catch (err) {
    next(err);
  }
});

// FORM RESPONSE ROUTES

// POST submit form response
router.post('/:id/responses', async (req, res, next) => {
  try {
    await formController.submitFormResponse(req, res);
  } catch (err) {
    next(err);
  }
});

// GET all responses for a form
router.get('/:id/responses', async (req, res, next) => {
  try {
    await formController.getAllResponses(req, res);
  } catch (err) {
    next(err);
  }
});

// GET single response details
router.get('/responses/:id', async (req, res, next) => {
  try {
    await formController.getSingleResponse(req, res);
  } catch (err) {
    next(err);
  }
});

// Error handling middleware for routes
router.use(errorHandler);

module.exports = router;
