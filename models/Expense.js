const mongoose = require('mongoose')

const ExpenseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    
    expensesName: {
        type: String,
        required: true
    },

    amount: {
        type: String,
        require: true
    },
    
    month: {
        type: String,
        require: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('expense', ExpenseSchema)