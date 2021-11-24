const {
    User
} = require('../models');
const {
    Op
} = require("sequelize");

module.expert ={
    resister : ()=>{

    },
    findUserByEmail : (user_email) => {
        try{
            console.log(user_email);
            const user = User.findOne({where : {email : user_email}})
            return user;
        }catch (err){
            console.error(err);
            throw err;
        }
    }
}
