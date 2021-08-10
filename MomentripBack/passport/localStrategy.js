const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');
require('dotenv').config();
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');

const JWTConfig = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
};

const JWTVerify = async (jwtPayload, done) => {
    try {
        console.log("JWTVerify 실행됨 ");
        // jwtPayload에 유저 정보가 담겨있다.
        // // 해당 정보로 유저 식별 로직을 거친다.
        let user = User.findOne({where : {email : jwtPayload.email }})
        // 유효한 유저라면
        if (user) {
            console.log("Token Verify");
            return done(null, user, {message : "token Verify"});
        }
        // 유저가 유효하지 않다면
        console.log("Token is not Verify");
        return done(null, false, { message: 'inaccurate token.' });
    } catch (error) {
            return res.status(400).error(error);

    }
};
passport.use('jwt', new JWTStrategy(JWTConfig, JWTVerify));

// 토큰에 담길 유저명의 key를 지정하는 옵션. 패스워드도 지정할 수 있다.
const passportConfig = { usernameField: 'email', passwordField : 'password' };

passport.use(
    'signin',
    new LocalStrategy(passportConfig, async (email, password, done) => {
        JWTStrategy(JWTConfig, JWTVerify);
        let user = await User.findOne({where: {email}})
        if(user){
            const result = await bcrypt.compare(password, user.password);
            if(result){
                return done(null, user, { message: 'Sign in Successful' });
            }else {
                return done(null, false, { message: 'Wrong password' });
            }
        }else {
            return done(null, false, { message: 'Wrong user Email' });
        }
    })
);

module.exports = passport ;