const userService = require('../service/userService');
const User = require('../models/user');

module.exports ={
    findAll : async (req, res) => {
        await userService.findAll(res);
        return res;
    },
    findUserById : async (req, res) => {
        const {user_id} = req.params;
        await userService.findUserById(user_id, res);
        return res;
    },
    findUserByEmail : async (req, res) => {
        const {email} = req.params;
        await userService.findUserByEmail(email, res);
        return res;
    },
    updateUser : async (req, res) => {
        // let profile_img = req.file;
        let profile_img = "example img";
        const {user_id} = req.params;
        const {email,
            nick,
            password,
            name,
            snsId,
            img} = req.body;
        if(!profile_img){
            profile_img = img;
        }
        await userService.updateUser(user_id,
            email,
            nick,
            password,
            name,
            snsId,
            profile_img,
            res);
        return res;
    },
    deleteUser : async (req, res) =>{
        const {user_id} = req.params;
        await userService.deleteUser(user_id, res);
        return res;
    },
    followUser : async (req, res)=> {
        const {following_userId, follower_userId} = req.body;
        console.log("follower_userId : " + following_userId);
        console.log("follower_userId : " + follower_userId);
        const user = await User.update( {
            followings : following_userId,
            followers : follower_userId
        },{where : {id : 1}})
        console.log(user);
        // const user = await User.findAll();
        return res.status(200).send(require('../modules/util').success(200, "success", user));
    }
}