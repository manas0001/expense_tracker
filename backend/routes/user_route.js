const express = require('express');
const user_controller = require('../controller/user_controller');

const userRouter = express.Router();

userRouter.post('/signup', user_controller.signup);
userRouter.post('/login', user_controller.login);

module.exports = userRouter;