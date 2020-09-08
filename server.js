const express = require('express');
const connectDB = require('./connectDB');
//ROUTES
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const expensesRoutes = require('./routes/expenses');
const budgetRoutes = require('./routes/budget');



const app = express()

//Connecting to MongoDB Atlas DB
connectDB();

//INIT Middleware
app.use(express.json({extended: false}))


const PORT = process.env.PORT || 5000;

//ROUTES
app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/expenses', expensesRoutes)
app.use('/api/budget', budgetRoutes)

app.listen(PORT, ()=> console.log(`SERVER START ON ${PORT}`))