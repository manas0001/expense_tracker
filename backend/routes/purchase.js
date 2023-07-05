const express = require('express');
const purchasecontroleller = require('../controller/purchase');
const authenticate = require('../authentication/auth');
const purchaseRoute = express.Router();

purchaseRoute.get('/premiummembership', authenticate, purchasecontroleller.premiumPurchase);
purchaseRoute.post('/updatetransactionstatus', authenticate, purchasecontroleller.updateTransactionStatus);
purchaseRoute.get('/getLatestPaymentStatus', authenticate, purchasecontroleller.getLatestUpdate);

module.exports = purchaseRoute;