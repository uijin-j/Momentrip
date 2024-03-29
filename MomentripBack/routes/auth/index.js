const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const util = require('../../modules/util');
const statusCode = require('../../modules/statusCode');
const responseMessage = require('../../modules/responseMessage');
const User = require('../../models/user');
const categoryMethod = require('../../method/categoryMethod')
const bookMethod = require('../../method/bookMethod')

const router = express.Router();

require('dotenv').config();
const jwt = require('jsonwebtoken');
const upload = require('../../modules/multer');
// const jwtStrategy = require('../../passport/jwtStrategy');
// const {local} = require('../../passport/index')

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
 *       summary: Creat your account
 *       tags: [Auth]
 *       requestBody:
 *          required: true
 *          content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/UserSignUp'
 *       responses:
 *         "200":
 *           description: "Success login"
 */
router.post('/signUp', upload.fields([{ name: "profile_img" }, { name: "background_img" }]),  async (req,res,next) => {
    let {profile_img, background_img} = req.files;
    profile_img = profile_img[0].location;
    background_img = background_img[0].location;
    /*
    upload.array('image',2)    미들웨어에 이걸로 넣어주면 image 배열로 받음
    const image  = req.files;
    console.log( image[0].location );
    console.log( image[1].location );
    */
    const { email, password, name,  snsId} = req.body;
    try{
        const exUser = await User.findOne({where: {email}});
        if(exUser){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_EMAIL));
        }
        const hash = await bcrypt.hash(password,12);
        let user = await User.create({
            email,
            password : hash,
            name,
            snsId,
            profile_img,
            background_img,
        });
        const defaultCategory = await categoryMethod.defaultRegister(user.id);
        const defaultBook = await bookMethod.defaultRegister(defaultCategory.id, user.id);

        return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS, user));
    }catch(error){
        console.error(error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_UP_FAIL));
    }
});

module.exports = router;
