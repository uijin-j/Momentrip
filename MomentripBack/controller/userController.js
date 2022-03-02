const userService = require('../service/userService');


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
    findFollowingById : async (req,res) => {
        const {user_id} = req.params;
        await userService.findFollowingById(user_id,res);
        return res;
    },
    updateUser : async (req, res) => {
        let profile_img = req.file.key;
        const {user_id} = req.params;
        const {email,
            password,
            name,
            snsId} = req.body;
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
        const {follower_id} = req.params;
        const {following_id} = req.body;
        await userService.followUser(follower_id, following_id, res);
        return res;
    },
    unfollowUser : async (req, res) => {
        const {follower_id} = req.params;
        const {following_id} = req.body;
        await userService.unfollowUser(follower_id, following_id, res);
        return res;
    },
    countUserFollow : async (req, res)=> {
        const {user_id} = req.params;
        await userService.countUserFollow(user_id, res);
        return res;
    },
    findUserFollow : async (req, res) => {
        const {user_id} = req.params;
        await userService.findUserFollow(user_id, res);
        return res;
    }
}
