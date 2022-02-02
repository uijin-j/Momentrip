const express = require('express');
const router = express.Router();
const bookController = require('../../controller/bookController');
const upload = require('../../modules/multer');
const authCheck = require('../../middleware/authCheck');

/**
 *  @swagger
 *  tags:
 *    name: Book
 *    description: API to check Book.
 */
/**
 * @swagger
 * paths:
 *  /momentrip/book:
 *   post:
 *      summary: Create your book
 *      tags : [Book]
 *      requestBody:
 *          required: true
 *          description: book_hit 0 이상으로 , 존재하는 유저Id로 넣기
 *          content:
 *            multipart/json:
 *              schema :
 *                  $ref: '#/components/schemas/BookPost'
 *      security:
 *          - bearerAuth: []
 *      responses:
 *        200:
 *              description: Success
 *   get:
 *      summary: Check all book
 *      tags: [Book]
 *      responses:
 *        200:
 *              description: Success
 */
router.post('/', upload.single('book_img'), bookController.registerBook); // book 만들기  (image 1개 올리기)
// router.post('/', upload.array('book_img', 2), bookController.registerBook); // book 만들기  (image 여러개 올리기)

router.get('/', bookController.findAllBook) //book 모두 불러오기
/**
 * @swagger
 *  paths:
 *   /momentrip/book/select/{id}:
 *    get:
 *      summary: Check book by book_id
 *      tags: [Book]
 *      parameters:
 *          - $ref : '#/components/parameters/queryId'
 *      responses:
 *        200:
 *              description: Success
 */
router.get('/select/:id',bookController.findBookById) // 특정 book 불러오기
/**
 * @swagger
 * paths:
 *  /momentrip/book/user/{user_id}:
 *    get:
 *     summary: Check book by user_id
 *     tags: [Book]
 *     parameters:
 *      - $ref : '#/components/parameters/queryUserId'
 *     responses:
 *          "200":
 *              description: Success
 */
router.get('/user/:user_id', bookController.searchBookByUserId) //특정 유저의 book 보기
router.get('/user/:user_id/:follow_id', bookController.searchBookByFollowingId) //특정 유저가 팔로잉하는 유저의 book 보기
/**
 * @swagger
 * paths:
 *  /momentrip/book/search/{keyword}:
 *    get:
 *     summary: Search book by keyword
 *     tags: [Book]
 *     parameters:
 *      - $ref : '#/components/parameters/queryKeyword'
 *     responses:
 *          "200":
 *              description: Success
 */
router.get('/search/:keyword', bookController.searchBook)
/**
 * @swagger
 * paths:
 *  /momentrip/book/{id}:
 *    patch:
 *      summary: Update book by book Id
 *      tags: [Book]
 *      requestBody:
 *          required: true
 *          description: update book
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/BookUpdate'
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - $ref : '#/components/parameters/queryId'
 *      responses:
 *          "200":
 *              description: Success
 */
router.patch('/:id', bookController.updateBookById) // 특정 book 업데이트
/**
 * @swagger
 * paths:
 *  /momentrip/book/{id}:
 *    delete:
 *     summary: delete book by book Id
 *     tags: [Book]
 *     parameters:
 *      - $ref : '#/components/parameters/queryId'
 *     security:
 *      - bearerAuth: []
 *     responses:
 *          "200":
 *              description: Success
 */
router.delete('/:id', bookController.deleteBook) // 특정 book 삭제

module.exports = router;
