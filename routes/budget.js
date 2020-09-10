const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const authMDW = require('../middleware/authMDW');
// const User = require('../models/User');
const Budget = require('../models/Budget');

require('dotenv').config()



//  Get /api/budget -> get user budget (private)
router.get('/', authMDW, async (req, res) => {
    try {
        const budgets = await Budget.find({user: req.user.id}).sort({date: -1});
        res.json(budgets);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

//  POST /api/budget -> post user budget (private)
router.post('/', [authMDW, [
    check('amount', 'Budget amount is required').not().isEmpty()

]], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const {amount, month} = req.body;

    try {
        const newBudget = await new Budget({
            amount,
            month,
            user: req.user.id
        })

        const budget = await newBudget.save() //saveing in DB
        res.json(budget)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

//  PUT /api/budget/:id -> update user budget (private)
router.put('/:id', authMDW, async (req, res) => {
    const {amount, month} = req.body;

    const budgetFields = {};
    if(amount) budgetFields.amount = amount
    if(month) budgetFields.month = month

    try {
        let budgetUpdated = await Budget.findById(req.params.id);

        if(!budgetUpdated) return res.status(404).json({msg: 'Expense not found'})

        //Make sure user onwns expenses
        if(budgetUpdated.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not Authorized'})
        }

        budgetUpdated = await Budget.findByIdAndUpdate(req.params.id, {$set: budgetFields}, 
            {new:true}
        );

        res.json({budgetUpdated})

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})


//  DELETE /api/budget/:id -> delete user budget (private)
router.delete('/:id', authMDW, async (req, res) => {
    try {
        let budgeteDelete = await Budget.findById(req.params.id);

        if(!budgeteDelete) return res.status(404).json({msg: 'Expense not found'})

        //Make sure user onwns expenses
        if(budgeteDelete.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not Authorized'})
        }

        await Budget.findByIdAndRemove(req.params.id);
        res.json({msg: 'Expense Remove'})

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router