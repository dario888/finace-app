const express = require('express');
const router = express.Router()



//  Get /api/budget -> get user budget (private)
router.get('/', (req, res) => {
    res.send('get budget')
})

//  POST /api/budget -> post user budget (private)
router.post('/', (req, res) => {
    res.send('post budget')
})

//  PUT /api/budget/:id -> update user budget (private)
router.put('/:id', (req, res) => {
    res.send('update budget')
})

//  DELETE /api/budget/:id -> delete user budget (private)
router.delete('/:id', (req, res) => {
    res.send('delete budget')
})

module.exports = router