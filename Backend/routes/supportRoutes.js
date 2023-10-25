const express = require('express');
const router = express.Router();
const supportController = require('../controller/supportController');

// Create a new support ticket
router.post('/support/:id', supportController.createSupport);

// Get all support tickets
router.get('/support', supportController.getSupport);
router.get('/support/:id', supportController.getSupportOnSrNo);

// Update a support ticket
router.put('/support/:id', supportController.updateSupport);

// Delete a support ticket
router.delete('/support/:id', supportController.deleteSupport);

module.exports = router;
