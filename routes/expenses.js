const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const authMDW = require('../middleware/authMDW');
// const User = require('../models/User');
const Expense = require('../models/Expense');

require('dotenv').config()




//  Get /api/expenses -> get user expenses (private)
router.get('/', authMDW, async (req, res) => {
    try {
        const expenses = await Expense.find({user: req.user.id}).sort({date: -1});
        res.json(expenses);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})


//  POST /api/expenses -> post user expenses (private)
router.post('/', [authMDW, [
    check('expensesName', 'Expense Name is required').not().isEmpty()

]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const {expensesName, amount, month} = req.body;

    try {
        const newExpense = await new Expense({
            expensesName,
            amount,
            month,
            user: req.user.id
        })

        const expense = await newExpense.save() //saveing in DB
        res.json(expense)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})


//  PUT /api/expenses/:id -> update user expenses (private)
router.put('/:id', authMDW, async (req, res) => {
    const {expensesName, amount, month} = req.body;

    const expenseFields = {};
    if(expensesName) expenseFields.expensesName = expensesName
    if(amount) expenseFields.amount = amount
    if(month) expenseFields.month = month

    try {
        let expenseUpdated = await Expense.findById(req.params.id);

        if(!expenseUpdated) return res.status(404).json({msg: 'Expense not found'})

        //Make sure user onwns expenses
        if(expenseUpdated.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not Authorized'})
        }

        expenseUpdated = await Expense.findByIdAndUpdate(req.params.id, {$set: expenseFields}, 
            {new:true}
        );

        res.json({expenseUpdated})

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})


//  DELETE /api/expenses/:id -> delete user expenses (private)
router.delete('/:id', authMDW, async (req, res) => {
    
    try {
        let expenseDelete = await Expense.findById(req.params.id);

        if(!expenseDelete) return res.status(404).json({msg: 'Expense not found'})

        //Make sure user onwns expenses
        if(expenseDelete.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not Authorized'})
        }

        await Expense.findByIdAndRemove(req.params.id);
        res.json({msg: 'Expense Remove'});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router