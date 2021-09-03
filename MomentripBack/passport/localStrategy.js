// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//실험
require('dotenv').config();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');

const JWTConfig = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
};

//jwt 토큰 안증 검증하기
const JWTVerify = async (jwtPayload, done) => {
    try {
        jwtPayload
        // jwtPayload에 유저 정보가 담겨있다.
        // 해당 정보로 유저 식별 로직을 거친다.


        // 유효한 유저라면
        if (user) {
            done(null, user);
            return;
        }
        // 유저가 유효하지 않다면
        done(null, false, { message: 'inaccurate token.' });
    } catch (error) {
        console.error(error);
        done(error);
    }
};
passport.use('jwt', new JWTStrategy(JWTConfig, JWTVerify));

// 토큰에 담길 유저명의 key를 지정하는 옵션. 패스워드도 지정할 수 있다.
const passportConfig = { usernameField: 'email', passwordField : 'password' };

passport.use(
    //회원가입이므로 볼 필요 x
    'signup',
    new localStrategy(passportConfig, async (userName, password, done) => {
        // 유저 생성
        // 성공하면
        return done(null, userName);

        // 실패하면
        return done(null, false, { message: 'User creation fail.' });
    })
);
// passport.use('minusSign', localStrategy(passportConfig,async (User)));


passport.use(
    'signin',
    new localStrategy(passportConfig, async (email, password, done) => {
        // console.log("passport user signin");
        let user = await User.findOne({where: {email}})
        if(user){
            // 유저가 db 에 존재한다면
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
//여기까지



/*
module.exports = () => {
<<<<<<< HEAD
    //local strategy : request에서 넘겨져오는 form-data와 localDB 에 저장되어있는 User 와 비교하기
    passport.use(LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
    }, async (email, password, done ) => {
=======
    console.log("local asdasdasdasdadsasd 실행");
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, passport, done) => {
>>>>>>> BackEnd_ysl
        try{
            const exUser = await User.findOne({where : {email}});
            if(exUser){
                const result = await bcrypt.compare(password, exUser.password);
                if(result){
                    done(null, exUser);
                }else{
                    done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
                }
            }else{
                done(null, false, { message: '가입되지 않은 회원입니다. '});
            }
        } catch(error){
            console.error(error);
            done(error);
        }

    }));
};
*/
