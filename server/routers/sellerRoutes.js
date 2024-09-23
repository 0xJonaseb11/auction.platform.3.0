const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/seller');
const authenticateToken = require('../middleware/auth');

// Define the route to get the seller's inventory
router.get('/inventory', sellerController.getSellerInventory);

module.exports = router;
