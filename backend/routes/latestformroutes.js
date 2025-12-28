const express = require('express');
const router = express.Router();
const formController = require('../controllers/formcontroller.js');

router.get('/', formController.getAllForms);

// Extend with more routes like
// router.get('/:id', formController.getFormById);
// router.post('/', formController.createForm);
// router.put('/:id', formController.updateForm);
// router.delete('/:id', formController.deleteForm);

module.exports = router;
