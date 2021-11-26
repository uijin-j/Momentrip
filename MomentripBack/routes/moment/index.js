const express = require('express');
const router = express.Router();
const momentController = require('../../controller/momentController');

/**
 *  @swagger
 *  tags:
 *    name: Moment
 *    description: API to check your moment.
 */
/**
 * @swagger
 * paths:
 *   /momentrip/moment/:
 *     post:
 *       summary: Create your moment
 *       tags: [Moment]
 *       requestBody:
 *          required: true
 *          description: Create moment
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/MomentPost'
 *       responses:
 *         "200":
 *              description: "Success"
 *     get:
 *       summary: Check your all moments
 *       tags: [Moment]
 *       responses:
 *         "200":
 *           description: "Success"
 */
router.post('/', momentController.registerMoment); // moment 만들기
router.get('/', momentController.findAllMoment); //moment 모두 불러오기
/**
 *  @swagger
 *  paths:
 *   /momentrip/moment/select/{id}:
 *     get:
 *       summary: Check your moment
 *       tags: [Moment]
 *       parameters:
 *          - $ref : '#/components/parameters/queryId'
 *       responses:
 *         "200":
 *           description: "Success"
 */
router.get('/select/:id', momentController.findMomentById); // 특정 moment 불러오기
/**
 *  @swagger
 *  paths:
 *   /momentrip/moment/user/{user_id}:
 *     get:
 *       summary: Check user's moment
 *       tags: [Moment]
 *       parameters:
 *          - $ref : '#/components/parameters/queryUserId'
 *       responses:
 *         "200":
 *           description: "Success"
 */
router.get('/user/:user_id',momentController.findMomentByUserId); //특정 유저의 moment 보기
/**
 *  @swagger
 *  paths:
 *   /momentrip/moment/book/{book_id}:
 *     get:
 *       summary: Check your moment
 *       tags: [Moment]
 *       parameters:
 *          - $ref : '#/components/parameters/queryBookId'
 *       responses:
 *         "200":
 *           description: "Success"
 */
router.get('/book/:book_id',momentController.findAllMomentByOneBook); // 특정 book에 속하는 moments 불러오기
/**
 *  @swagger
 *  paths:
 *   /momentrip/moment/{id}:
 *     patch:
 *       summary: Update your moment
 *       tags: [Moment]
 *       parameters:
 *          - $ref : '#/components/parameters/queryId'
 *       requestBody:
 *          required: true
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MomentUpdate'
 *       responses:
 *         "200":
 *           description: "Success"
 */
router.patch('/:id', momentController.updateMomentById); // 특정 moment 업데이트
/**
 *  @swagger
 *  paths:
 *   /momentrip/moment/{id}:
 *     delete:
 *       summary: Delete your moment
 *       tags: [Moment]
 *       parameters:
 *          - $ref : '#/components/parameters/queryId'
 *       responses:
 *         "200":
 *           description: "Success"
 */
router.delete('/:id', momentController.deleteMomentById);// 특정 moment 삭제


module.exports = router;
