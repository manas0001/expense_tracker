const express = require('express');
const expense_controller = require('../controller/expense_controller');
const authenticate = require('../authentication/auth');

const expenseRoute = express.Router();

expenseRoute.post('/addexpense',authenticate, expense_controller.addExpense);
expenseRoute.get('/getAllExpense', authenticate, expense_controller.getAllExpense);
expenseRoute.delete('/deleteexpense/:expenseid',  expense_controller.deleteExpense)
expenseRoute.get('/leaderboard', authenticate, expense_controller.leaderboard);
module.exports = expenseRoute;