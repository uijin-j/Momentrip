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
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try{
            const user = await userMethod.findById(user_id);
            if(!user){
                console.log("해당 유저가 존재하지 않습니다");
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
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
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try{
            const user = await userMethod.findUserByEmail(user_email);
            if(!user){
                console.log("해당 유저가 존재하지 않습니다");
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
            }
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_USER_BY_USER_EMAIL_SUCCESS, user));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_USER_BY_USER_EMAIL_FAIL);
        }
    },
    findFollowingById : async (user_id,res) => {
        if(!user_id){
            console.log("필요값누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.FIND_USER_BY_USER_EMAIL_FAIL));
        }
        try{
            const following_id = await userMethod.findFollowingById(user_id)
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
            if(!following_id){
                console.log("해당 유저가 팔로잉한 사람이 아닙니다.");
            }
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_FOLLOWING_BY_ID_SUCCESS, following_id));
        }catch(err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_USER_BY_USER_EMAIL_FAIL);
        }
    },
    updateUser : async (id,
        email,
        password,
        name,
        snsId,
        profile_img,
        background_img,
    res) => {
        if(!id || !email || !password ||!name ||!snsId || !profile_img || !background_img){
            console.log("필요값누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try{
            let exUser = await userMethod.findById(id);
            if(!exUser){
                console.log("해당 유저 정보 없음");
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
            }
            const user = await userMethod.updateUser(id, email, password, name, snsId, profile_img, background_img);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_USER_SUCCESS, user));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_USER_FAIL));
        }
    },
    deleteUser : async (user_id, res) => {
        if(!user_id){
            console.log("필요값누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
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
    },
    followUser : async (follower_id, following_id, res) => {
        if(!follower_id || !following_id){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        const followerUser = await userMethod.findById(follower_id);
        const followingUser = await userMethod.findById(following_id);
        if(!followingUser || !followerUser) {
            console.log("잘못된 요청")
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
        }
        try{
            const follow = await userMethod.following(follower_id, following_id);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FOLLOW_USER_SUCCESS, follow));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FOLLOW_USER_FAIL));
        }
    },
    unfollowUser : async (follower_id, following_id, res) => {
        if(!follower_id || !following_id){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        const followerUser = await userMethod.findById(follower_id);
        const followingUser = await userMethod.findById(following_id);
        if(!followingUser || !followerUser) {
            console.log("잘못된 요청")
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
        }
        try{
            const unfollow = await userMethod.unfollowing(follower_id, following_id);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UNFOLLOW_USER_SUCCESS, unfollow));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UNFOLLOW_USER_FAIL))
        }
    },
    countUserFollow : async (user_id, res) => {
        if(!user_id){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        const user = userMethod.findById(user_id);
        if(!user){
            console.log("잘못된 요청")
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
        }
        try{
            const count = await userMethod.countUserFollow(user_id);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.COUNT_FOLLOW_SUCCESS, count));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.COUNT_FOLLOW_FAIL));
        }
    },
    findUserFollow : async (user_id, res) => {
        if(!user_id){
            console.log("필요값 누락")
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        let user = await userMethod.findById(user_id);
        if(!user){
            console.log("잘못된 요청")
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
        }
        try{
            user = await userMethod.findUserFollow(user_id);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_USER_FOLLOW_SUCCESS, user));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_USER_FOLLOW_FAIL));
        }
    }
}
