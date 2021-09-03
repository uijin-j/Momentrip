const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
    passport.use( new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {

        console.log(profile);
        try {
            let hash = process.env.KAKAO_ID;
            const exUser = await User.findOne({
                where: { snsId: profile.id, provider: 'kakao' },
            });
            if (exUser) {
                done(null, exUser);
            } else {
                let user = await User.create({
                    email : profile._json.kakao_account.email,
                    password : hash,
                    nick : profile.displayName,
                    name : profile.username,
                    provider : profile.provider,
                });
                return done(null, user, {message: 'Kakao login success'});
            }
        } catch (error) {
            console.error(error);
            return done(null, false, { message: 'Kakao login fail.' });
        }
    }));
};