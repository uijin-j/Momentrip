const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');
const {local} = require('../passport/index')

const router = express.Router();

require('dotenv').config();
const jwt = require('jsonwebtoken');

router.post('/signIn' ,(req, res, next) => {
    passport.authenticate('signin', (err, user, info) => {
        if (!user) {
            return res.status(400).json({ message: info.message });
        }
        const token = jwt.sign(
            { Email : req.body.email },
            process.env.JWT_SECRET_KEY
        );
        return res.json({ user ,token });
    })(req, res, next);
});

router.post('/signUp', async (req,res,next) => {

    const { email, password, nick, name } = req.body;
    try{
        const exUser = await User.findOne({where: {email}});
        if(exUser){
            return res.status(400).json({error:[{message: '이미 존재하는 회원입니다.'}]});
        }
        const hash = await bcrypt.hash(password,12);
        let user = await User.create({
            email,
            password : hash,
            nick,
            name,
        });
        return res.json(user);
    }catch(error){
        console.error(error);
        return next(error);
    }
});

module.exports = router;
