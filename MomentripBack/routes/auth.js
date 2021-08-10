const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');
const {local} = require('../passport/index')

const router = express.Router();


//실험
require('dotenv').config();
const jwt = require('jsonwebtoken');

router.post('/login1', isNotLoggedIn ,(req, res, next) => {
    console.log("post /auth/login1");
    passport.authenticate('signin', (err, user, info) => {
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: info.message });
        }
        const token = jwt.sign(
            { userName: req.body.userName },
            process.env.JWT_SECRET_KEY
        );
        console.log('로그인성공');
        res.json({ token });
    })(req, res, next);
});
//
// router.post('/login2', async (req, res, next) => {
//     let {email, password} = req.body;
//     console.log(email, " + ", password);
//     var user = await User.findOne({where: { email : email}})
//     // console.log(user.email)
//     // console.log(user.name);
//     console.log(user);
//     return res.status(200).json(user);
// })
//여기까지




router.post('/join',isNotLoggedIn, async (req,res,next) => {
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
//
//
// router.post('/login', isNotLoggedIn, (req,res,next) => {
//     console.log("post login");
//     passport.authenticate('local', (authError, user, info) => {
//         if (authError) {
//             console.error(authError);
//             return next(authError);
//         }
//         if (!user) {
//             return res.redirect(`/?loginError=${info.message}`);
//         }
//         return req.login(user, (loginError) => {
//             if (loginError) {
//                 console.error(loginError);
//                 return next(loginError);
//             }
//             return res.redirect('/');
//         });
//     })(req, res, next);
// });
//

module.exports = router;
