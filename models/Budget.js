const mongoose = require('mongoose')

const BudgetSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
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


module.exports = mongoose.model('budget', BudgetSchema)