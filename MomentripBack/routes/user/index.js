const express = require('express');
const User = require('../../models/user');
const userController = require('../../controller/userController');

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
 *       security:
 *          - bearerAuth: []
 *       responses:
 *         "200":
 *           description: "Success"
 *         "400":
 *           description: "Error"
 *         "500":
 *           description: "Fail"
 */
router.post('/follow/:id', userController.followUser);
// router.post('/follow/:id', async(req,res,next) => {);
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
 *       security:
 *          - bearerAuth: []
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
/**
 *  @swagger
 *  tags:
 *    name: User
 *    description: API to Check User
 */
/**
 * @swagger
 *  paths:
 *    /momentrip/user:
 *      get :
 *          summary: Check all users
 *          tags: [User]
 *          responses:
 *              200:
 *                  description: Success
*/
router.get('/', userController.findAll);
/**
 * @swagger
 *  paths:
 *    /momentrip/user/select/id/{user_id}:
 *      get :
 *          summary: Check user by user id
 *          tags: [User]
 *          parameters:
 *              - $ref : '#/components/parameters/queryUserId'
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: Success
 */
router.get('/select/id/:user_id', userController.findUserById);
/**
 * @swagger
 *  paths:
 *    /momentrip/user/select/email/{email}:
 *      get :
 *          summary: Check use by email
 *          tags: [User]
 *          parameters:
 *              - $ref : '#/components/parameters/queryEmail'
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: Success
 */
router.get('/select/email/:email', userController.findUserByEmail);
/**
 * @swagger
 *  paths:
 *    /momentrip/user/{user_id}:
 *      patch :
 *          summary: Update user
 *          tags: [User]
 *          parameters:
 *              - $ref : '#/components/parameters/queryUserId'
 *          requestBody:
 *              required: true
 *              description: 유저 업데이트 하기
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserUpdate'
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: Success
 */
router.patch('/:user_id' , userController.updateUser);
/**
 * @swagger
 *  paths:
 *    /momentrip/user/{user_id}:
 *      delete :
 *          summary: Delete user
 *          tags: [User]
 *          parameters:
 *              - $ref : '#/components/parameters/queryUserId'
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: Success
 */
router.delete('/:user_id', userController.deleteUser);



module.exports = router;
