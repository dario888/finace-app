const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator/check');
require('dotenv').config()

const User = require('../models/User')



//  POST /api/users -> registre user (Public)
router.post('/',
    [
        check('name', 'Please add name').not().isEmpty(),
        check('email', 'Please include valid email').isEmail(),
        check('password', 'Please eneter password with 6 or more characters').isLength({min: 6})
    
    ], 
    
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

       const {name, email, password} = req.body;

       try {
        //geting User from DB
        let user = await User.findOne({email})
           
        if(user)return res.status(400).json({msg: 'User already exists'})

        user = new User({
            name,
            email,
            password
        })

        //incripting the password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save();

        //Singning the token -> payload, secret, expires, return token
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.JWT, {
            expiresIn: 3600

        }, (err, token) => {
            if(err)throw err;
            res.json({token})

        })

       } catch (err) {
           console.log(err);
           res.status(500).send('Server Error')
           
       }
    }
)


module.exports = router