const express = require('express');
const router = express.Router();
const momentController = require('../../controller/momentController');
const upload = require('../../modules/multer');
const authCheck = require('../../middleware/authCheck');

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
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/MomentPost'
 *       security:
 *          - bearerAuth: []
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
// router.post('/', authCheck.isLoggedIn, upload.single('momentImg'), momentController.registerMoment); // moment 만들기
router.post('/', upload.single('momentImg'), momentController.registerMoment); // moment 만들기
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
 *       summary: Check user's individual moment (북에 포함 안된)
 *       tags: [Moment]
 *       parameters:
 *          - $ref : '#/components/parameters/queryUserId'
 *       responses:
 *         "200":
 *           description: "Success"
 */
router.get('/user/:user_id', momentController.findUserIndividualMoment);//유저의 북에 들어가있지 않는 moment 보기
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
router.get('/book/:book_id',momentController.findMomentByBook); // 특정 book에 속하는 moments 불러오기
/**
 *  @swagger
 *  paths:
 *   /momentrip/moment/search:
 *     get:
 *       summary: search moment with tag
 *       tags: [Moment]
 *       requestBody:
 *          required: true
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MomentSearch'
 *       responses:
 *         "200":
 *           description: "Success"
 */
router.get('/search', momentController.searchMoment);
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
 *             multipart/form-data:
 *               schema:
 *                 $ref: '#/components/schemas/MomentUpdate'
 *       security:
 *          - bearerAuth: []
 *       responses:
 *         "200":
 *           description: "Success"
 */
router.patch('/:id'/*, authCheck.isLoggedIn*/, upload.single('momentImg'), momentController.updateMomentById); // 특정 moment 업데이트
/**
 *  @swagger
 *  paths:
 *   /momentrip/moment/{id}:
 *     delete:
 *       summary: Delete your moment
 *       tags: [Moment]
 *       parameters:
 *          - $ref : '#/components/parameters/queryId'
 *       security:
 *          - bearerAuth: []
 *       responses:
 *         "200":
 *           description: "Success"
 */
router.delete('/:id', authCheck.isLoggedIn, momentController.deleteMomentById);// 특정 moment 삭제


module.exports = router;
