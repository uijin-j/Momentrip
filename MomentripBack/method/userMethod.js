const {
    User
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
    updateUser : async (id, email, password, name, snsId, profile_img) => {
        try{
            const user = await User.update({
                email,
                password,
                name,
                snsId,
                profile_img
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
    following : async (followingUser, followed_id) => {
        try{
            await followingUser.addFollowing(parseInt(followed_id,10));
        }catch (err){
            throw err;
        }
    }
}
