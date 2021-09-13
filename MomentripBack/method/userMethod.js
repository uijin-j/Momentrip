const {
    User
} = require('../models');
const{
    Op
} = require("sequelize");

module.exports = {
    findAll : async () => {
        try{
            const users = await User.findAll();
            console.log("3")
            console.log(users);
            console.log("4");
            return users;
        }catch (err){
            throw err;
        }
    },
    findById : async (id)=> {
        try{
            const user = await User.findOne( { where : {id}});
            return user;
        }catch (err){
            throw err;
        }
    },
    updateUser :
        async (id,
               email,
               nick,
               password,
               name,
               snsId,
               profile_img) => {
        try{
            const user = await User.update({
                email,
                nick,
                password,
                name,
                snsId,
                profile_img
            }, {where : {id}});
            return user;
        }catch (err){
            throw err;
        }
    },
    deleteUser : async (id) =>{
        try{
            const user = await User.delete( { where : {id}});
            return user;
        }catch (err){
            throw err;
        }
    },
    followUser : async (followingId, followerId) => {
        try{

        }catch (err){
            throw err;
        }
    }
}