const express = require('express');
const User = require('../../models/user');

const router = express.Router();
/**
 *  @swagger
 *  tags:
 *    name: Follow
 *    description: API to follow other User
 */
/**
 *  @swagger
 *  paths:
 *   /momentrip/user/follow/{id}:
 *     post:
 *       summary: follow other users
 *       tags: [Follow]
 *       requestBody:
 *          required: true
 *          content:
 *           application/json:
 *             schema:
 *               properties:
 *                 id:
 *                  type: integer
 *       parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric ID of the following user
 *       responses:
 *         "200":
 *           description: "Success"
 *         "400":
 *           description: "Error"
 *         "500":
 *           description: "Fail"
 */
router.post('/follow/:id', async(req,res,next) => {
    try{
        console.log(req.body.id);
        const user = await User.findOne({where: {id: req.body.id}});
        if(user) {
            await user.addFollowing(parseInt(req.params.id,10));
            res.send('success');
        }else{
            res.status(404).send('No user');
        }
    }catch(error) {
        console.error(error);
        next(error);
    }
});

/**
 *  @swagger
 *  paths:
 *   /momentrip/user/unfollow/{id}:
 *     post:
 *       summary: unfollow other users
 *       tags: [Follow]
 *       parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric ID of the unfollowing user
 *       responses:
 *         "200":
 *           description: "Success"
 *         "400":
 *           description: "Error"
 *         "500":
 *           description: "Fail"
 */
router.post('/unfollow/:id', async(req,res,next) => {
    try{
        const user = await User.findOne({where:{id:req.params.id}});
        if(user) {
            await user.removeFollower(parseInt('2'));
            res.send('success');
        }
    }catch(error){
        console.error(error);
    }
});

module.exports = router;
