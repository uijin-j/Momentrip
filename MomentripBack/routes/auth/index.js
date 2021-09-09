const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../../models/user');

const router = express.Router();

require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtStrategy = require('../../passport/jwtStrategy');
const {local} = require('../../passport/index')


require('dotenv').config();

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

/*router.post('/login', jwtStrategy, (req,res,next) => {
    passport.authenticate('local', {session: false}, (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, {session: false}, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }

            //로그인에 성공하면 jwt 발급해준다.
            const token = jwt.sign({
                id: User.id,
                nick: User.nick,
            }, process.env.JWT_SECRET);

            return res.json({
                code: 200,
                message: '토큰이 발급되었습니다',
                token,
            });
        });
    })(req, res, next);
})*/

router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    console.log("kakao login 성공");
    console.log("get /post /auth/kakao/callback");
    res.redirect('/');
});

module.exports = router;