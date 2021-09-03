const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
<<<<<<< Updated upstream:MomentripBack/routes/auth.js
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');
=======
const User = require('../../models/user');
const {local} = require('../../passport')

const router = express.Router();

require('dotenv').config();
>>>>>>> Stashed changes:MomentripBack/routes/auth/index.js
const jwt = require('jsonwebtoken');
const jwtStrategy = require('../passport/jwtStrategy');

const router = express.Router();

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


router.post('/login', isNotLoggedIn,jwtStrategy(), (req,res,next) => {
    passport.authenticate('local',{session: false}, (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, {session:false}, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }

            //로그인에 성공하면 jwt 발급해준다.
            const token = jwt.sign({
                id : User.id,
                nick : User.nick,
            }, process.env.JWT_SECRET);

            return res.json({
                code:200,
                message:'토큰이 발급되었습니다',
                token,
            });
        });
    })(req, res, next);
});

module.exports = router;
