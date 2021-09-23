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
/**
 *  @swagger
 *  tags:
 *    name: Auth
 *    description: API to check your authenticate.
*/
/**
 *  @swagger
 *  paths:
 *   /momentrip/auth/signIn:
 *     post:
 *       summary: Check your account
 *       tags: [Auth]
 *       requestBody:
 *          required: true
 *          content:
 *           application/json:
 *             schema:
 *               properties:
 *                 email:
 *                  type: string
 *                 password:
 *                  type: string
 *       responses:
 *         "200":
 *           description: "Success login"
 *         "400":
 *           description: "Authentication Error"
 *         "500":
 *           description: "Fail login"
*/
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
/**
 *  @swagger
 *  paths:
 *   /momentrip/auth/signUp:
 *     post:
 *       summary: Check your account
 *       tags: [Auth]
 *       requestBody:
 *          required: true
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         "200":
 *           description: "Success login"
 *         "400":
 *           description: "Authentication Error"
 *         "500":
 *           description: "Fail login"
 */
router.post('/signUp', async (req,res,next) => {
    const { email, password, nick, name,  snsId, profile_img} = req.body;
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
            snsId,
            profile_img
        });
        return res.json(user);
    }catch(error){
        console.error(error);
        return next(error);
    }
});

module.exports = router;
