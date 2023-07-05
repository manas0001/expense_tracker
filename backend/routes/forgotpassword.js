const express = require('express');
const forgotpasscontroller = require('../controller/forgotpassword');
const router = express.Router();

router.post('/userforgotpassword', forgotpasscontroller.forgotPassword);
router.get('/resetpassword/:id', forgotpasscontroller.resetpassword);
router.get('/updatepassword/:id', forgotpasscontroller.updatePassword);

module.exports = router;