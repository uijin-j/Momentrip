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
            password,
            name,
            snsId,
            img} = req.body;
        if(!profile_img){
            profile_img = img;
        }
        await userService.updateUser(user_id,
            email,
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
        const following_id = req.body;
        const followed_id = req.params.id;
        // user.addFollowing(parseInt(req.params.id,10));
        await userService.followUser(following_id, followed_id, res);
        return res;
    }
}
