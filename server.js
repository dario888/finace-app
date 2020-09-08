const express = require('express');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const expensesRoutes = require('./routes/expenses');
const budgetRoutes = require('./routes/budget');

const app = express()

const PORT = process.env.PORT || 5000;

//ROUTES
app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/expenses', expensesRoutes)
app.use('/api/budget', budgetRoutes)

app.listen(PORT, ()=> console.log(`SERVER START ON ${PORT}`))