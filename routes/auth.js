const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator/check');
require('dotenv').config()

const User = require('../models/User')
const authMDW = require('../middleware/authMDW')




//  Get /api/auth -> get loged in user (private)
router.get('/', authMDW, async (req, res) => {
    //req is from authMDW
   try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);

   } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
   }
})



//  POST /api/auth -> post loged in user (public)
router.post('/',  [
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Password is required').exists()

], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    const {email, password} = req.body;

    try {
        //geting User from DB
        let user = await User.findOne({email})
        
        if(!user)return res.status(400).json({msg: 'Invalid Credentials'})

        //comapre passwords from SignUp and DB
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)return res.status(400).json({msg: 'Invalid Password, Please enter valid Password'})

        //Singning the token -> payload, secret, expires, return token
        const payload = {
            user: {
                id: user.id
            }
        }
        
        jwt.sign(payload, process.env.JWT, {
        expiresIn: 36000
            
        }, (err, token) => {
            if(err)throw err;
            res.json({token})

        })


    } catch (err) {
        console.error(err.message)
        res.status(500).json('Server Error')
    }
})

module.exports = router