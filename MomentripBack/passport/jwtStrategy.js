const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = require('../models/user');

module.exports = () => {
    //로그인에 성공하면 jwt 토큰을 발급해주고 사용자는 서버에 요청을 할 때마다 그 jwt 토큰을 같이 보내는데
    //사용자가 보내는 토큰이 유효한지 인증해주는 strategy 이다.
    //JWT Strategy : JWT 토큰을 읽어 해당 사용자를 인증한다.
    passport.use(new JWTStrategy({
        // header에 bearer 스키마에 담겨온 토큰을 해석하는 옵션
        jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
        // 해당 복호화 방법 사용 옵션
        secretOrKey : process.env.JWT_SECRET,
    }, async (jwtPayload, done) => {
        try{
            const user = await User.findOne({where : {jwtPayload}});
            if(user){
                done(null,user);
            }
        }catch(error){
            console.error(error);
        }

    }));
};
