const express = require('express');
const User = require('../../models/user');
const userController = require('../../controller/userController');

const router = express.Router();

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
//모든 유저 조회하기
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
//id로 특정 유저 정보 조회하기
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
//email로 특정 유저 조회하기
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
 *                  multipart/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserUpdate'
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: Success
 */
//user_id 로 유저 정보 업데이트하기
router.patch('/:user_id' ,upload.fields([{ name: "profile_img" }, { name: "background_img" }]), userController.updateUser);
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
//user_id 로 유저 삭제하기
router.delete('/:user_id', userController.deleteUser);


/**
 *  @swagger
 *  tags:
 *    name: Follow
 *    description: API to follow other User
 */
/**
 *  @swagger
 *  paths:
 *   /momentrip/user/follow/{follower_id}:
 *     post:
 *       summary: follow other users
 *       tags: [Follow]
 *       requestBody:
 *          required: true
 *          content:
 *           application/json:
 *             schema:
 *               properties:
 *                 following_id:
 *                  type: integer
 *       parameters:
 *          - $ref : '#/components/parameters/followerUserId'
 *            description: Numeric ID of the following user
 *       security:
 *          - bearerAuth: []
 *       responses:
 *         "200":
 *           description: "Success"
 */
//유저 팔로우하기
router.post('/follow/:follower_id', userController.followUser);
/**
 *  @swagger
 *  paths:
 *   /momentrip/user/unfollow/{follower_id}:
 *     post:
 *       summary: unfollow other users
 *       tags: [Follow]
 *       requestBody:
 *          required: true
 *          content:
 *           application/json:
 *             schema:
 *               properties:
 *                 following_id:
 *                  type: integer
 *       parameters:
 *          - $ref : '#/components/parameters/followerUserId'
 *            description: Numeric ID of the unfollowing user
 *       security:
 *          - bearerAuth: []
 *       responses:
 *         "200":
 *           description: "Success"
 */
//유저 팔로우하기 취소하기
router.post('/unfollow/:follower_id', userController.unfollowUser);
/**
 * @swagger
 *  paths:
 *    /momentrip/user/count/follow/{user_id}:
 *      get :
 *          summary: Count user's follower and following by user id
 *          tags: [Follow]
 *          parameters:
 *              - $ref : '#/components/parameters/queryUserId'
 *          responses:
 *              200:
 *                  description: Success
 */
router.get('/count/follow/:user_id', userController.countUserFollow);
/**
 * @swagger
 *  paths:
 *    /momentrip/user/{user_id}/follower/following:
 *      get :
 *          summary: Get user's follower and following by user id
 *          tags: [Follow]
 *          parameters:
 *              - $ref : '#/components/parameters/queryUserId'
 *          responses:
 *              200:
 *                  description: Success
 */
router.get('/:user_id/follower/following', userController.findUserFollow);

module.exports = router;
