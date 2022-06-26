const express = require('express');
const router = express.Router();
const responseController = require('../controllers/responseController')

router.get('/successfulPayment/:id',  responseController.successfulPayment);
router.get('/success',  responseController.approved);
router.get('/pendingPayment/:id',  responseController.pendingPayment);
router.get('/pending',  responseController.pending);
router.get('/failurePayment/:id',  responseController.failurePayment);
router.get('/failure',  responseController.failure);



module.exports = router;