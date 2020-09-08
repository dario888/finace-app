const express = require('express');
const router = express.Router()



//  Get /api/expenses -> get user expenses (private)
router.get('/', (req, res) => {
    res.send('get expenses')
})

//  POST /api/expenses -> post user expenses (private)
router.post('/', (req, res) => {
    res.send('post expenses')
})

//  PUT /api/expenses/:id -> update user expenses (private)
router.put('/:id', (req, res) => {
    res.send('update expenses')
})

//  DELETE /api/expenses/:id -> delete user expenses (private)
router.delete('/:id', (req, res) => {
    res.send('delete expenses')
})

module.exports = router