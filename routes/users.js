const express = require('express');
const router = express.Router()

// // GET /api/users -> get login user (private)
// router.get('/', (req, res) => {
//     res.send('get login user')
// })

//  POST /api/users -> registre user (Public)
router.post('/', (req, res) => {
    res.send('registre user')
})


module.exports = router