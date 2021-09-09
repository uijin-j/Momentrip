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
            return user;
        }catch (err){
            throw err;
        }
    },
    findById : async (user_id)=> {
        try{
            const user = await User.findOne( { where : {user_id}});
        }catch (err){
            throw err;
        }
    }
}