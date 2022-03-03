const {
    User,
    Follow
} = require('../models');
const {
    Op
} = require("sequelize");

module.exports ={
    findAll : async () => {
        try{
            const users = await User.findAll();
            return users;
        }catch (err){
            throw err;
        }
    },
    findById : async (id) => {
        try{
            const user = await User.findOne({where : { id }})
            return user;
        }catch (err){
            throw err;
        }
    },
    findUserByEmail : async (user_email) => {
        try{
            console.log(user_email);
            const user = await User.findOne({where : {email : user_email}})
            return user;
        }catch (err){
            throw err;
        }
    },
    findFollowingById : async (followerId) => {
        try {
            const following = await Follow.findOne({where:{followerId}})
            return following;
        }catch(err){
            throw err;
        }
    },
    updateUser : async (id, email, password, name, snsId, profile_img, background_img) => {
        try{
            const user = await User.update({
                email,
                password,
                name,
                snsId,
                profile_img,
                background_img
            }, {
                where : { id }
            });
            return user;
        }catch (err){
            throw err;
        }
    },
    delete : async (id) => {
        try{
            await User.destroy( { where : {id}});
        }catch (err){
            throw err;
        }
    },
    following : async (follower_id, following_id) => {
        try{
            const follow = await Follow.create({
                followerId : follower_id,
                followingId : following_id
            })
            return follow;
        }catch (err){
            throw err;
        }
    },
    unfollowing : async (follower_id, following_id) => {
        try{
            const unfollow = await Follow.destroy({where : {
                [Op.and]:[{followerId : follower_id}, {followingId : following_id}]
            }})
            return unfollow;
        }catch (err){
            throw err;
        }
    },
    countUserFollow : async (user_id) => {
        try{
            const count = {}
            const following = await Follow.findAll({where : {followerId : user_id}});
            const follower = await Follow.findAll({where : {followingId : user_id}});
            count.followingNum = following.length;
            count.followerNum = follower.length;
            return count;
        }catch (err){
            throw err;
        }
    },
    findUserFollow : async (user_id) => {
        try{
            const following = await Follow.findAll({where : {followerId : user_id}});
            const follower = await Follow.findAll({where : {followingId : user_id}});

            const followingUser = {};
            const followerUser = {};
            for(const property in following) followingUser[property] = await User.findOne({where : {id : following[property].followingId }})
            for(const property in follower) followerUser[property] = await User.findOne({where: {id: follower[property].followerId}})

            const user = {};
            user.following = followingUser;
            user.follower = followerUser;
            return user;
        }catch (err){
            throw err;
        }

    }
}
