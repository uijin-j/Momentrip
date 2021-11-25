const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const responseMessage = require('../modules/responseMessage');
const userMethod = require('../method/userMethod');

module.exports = {
    findAll : async (res)=>{
        try{
            const users = await userMethod.findAll();
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_USER_ALL_SUCCESS, users));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_USER_ALL_FAIL));
        }
    },
    findUserById : async (user_id, res) =>{
        if(!user_id){
            console.log("필요값누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.FIND_USER_BY_USER_ID_FAIL));
        }
        try{
            const user = await userMethod.findById(user_id);
            if(!user){
                console.log("해당 유저가 존재하지 않습니다");
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.FIND_USER_BY_USER_ID_FAIL));
            }
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_USER_BY_USER_ID_SUCCESS, user));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_USER_BY_USER_ID_FAIL);
        }
    },
    findUserByEmail : async (user_email, res) =>{
        if(!user_email){
            console.log("필요값누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.FIND_USER_BY_USER_EMAIL_FAIL));
        }
        try{
            const user = await userMethod.findUserByEmail(user_email);
            if(!user){
                console.log("해당 유저가 존재하지 않습니다");
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.FIND_USER_BY_USER_EMAIL_FAIL));
            }
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_USER_BY_USER_EMAIL_SUCCESS, user));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_USER_BY_USER_EMAIL_FAIL);
        }
    },
    updateUser : async (id,
        email,
        nick,
        password,
        name,
        snsId,
        profile_img,
        res) => {
        if(!id || !email || !nick || !password ||!name ||!snsId || !profile_img){
            console.log("필요값누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.UPDATE_USER_FAIL));
        }
        try{
            let exUser = await userMethod.findById(id);
            if(!exUser){
                console.log("해당 유저 정보 없음");
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.UPDATE_USER_FAIL));
            }
            const user = await userMethod.updateUser(id, email, nick, password, name, snsId, profile_img);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_USER_SUCCESS, user));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_USER_FAIL));
        }
    },
    deleteUser : async (user_id, res) => {
        if(!user_id){
            console.log("필요값누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.DELETE_USER_FAIL));
        }
        try{
            const exUser = await userMethod.findById(user_id);
            if(!exUser){
                console.log("해당 사용자 정보 없음");
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.DELETE_USER_FAIL));
            }
            const user = await userMethod.delete(user_id);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.DELETE_USER_SUCCESS, user));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_USER_FAIL));
        }
    }
}