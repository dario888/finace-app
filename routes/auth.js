const express = require('express');
const router = express.Router()



//  Get /api/auth -> get loged in user (private)
router.get('/', (req, res) => {
    res.send('get loged in user')
})



//  POST /api/auth -> post loged in user (public)
router.post('/', (req, res) => {
    res.send('post loged in user')
})

module.exports = router