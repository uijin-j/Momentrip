const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

module.exports = () => {
    //local strategy : request에서 넘겨져오는 form-data와 localDB 에 저장되어있는 User 와 비교하기
    passport.use(LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
    }, async (email, password, done ) => {
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
