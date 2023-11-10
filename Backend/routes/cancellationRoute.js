const express = require('express')
const { getAllcancellations, addNewCancellation, getCancellationById, updateCancellation, deleteCancellation } = require('../controller/cancellationController')

const router = express.Router()
router.post('/cancellations/:id', addNewCancellation)
router.post('/cancellations', getCancellationById)
router.get('/cancellation/:userId')

module.exports = router