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
 *            multipart/form-data:
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
// router.post('/', authCheck.isLoggedIn, upload.single('book_img'), bookController.registerBook); // book 만들기  (image 1개 올리기)
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
 *  /momentrip/book/category/{category_id}:
 *    get:
 *     summary: Check book by category id
 *     tags: [Book]
 *     parameters:
 *      - $ref : '#/components/parameters/queryCategoryId'
 *     responses:
 *          "200":
 *              description: Success
 */
router.get('/category/:category_id', bookController.findBookByCategoryId) //특정 카테고리의 book 보기
/**
 * @swagger
 * paths:
 *  /momentrip/book/user/{user_id}:
 *    get:
 *     summary: Check User's book by user id
 *     tags: [Book]
 *     parameters:
 *      - $ref : '#/components/parameters/queryUserId'
 *     responses:
 *          "200":
 *              description: Success
 */
router.get('/user/:user_id/', bookController.findBookByUserId) //특정 유저의 book 보기
/**
 * @swagger
 * paths:
 *  /momentrip/book/follow/user/{user_id}:
 *    get:
 *     summary: Check followingUser's books by user id
 *     tags: [Book]
 *     parameters:
 *      - $ref : '#/components/parameters/queryUserId'
 *     responses:
 *          "200":
 *              description: Success
 */
router.get('/follow/user/:user_id/', bookController.findFollowingUserBook) //유저가 팔로잉하는 모든 유저들의 book 보기
/**
 * @swagger
 * paths:
 *  /momentrip/book/search/{tour_style}/{TourRegionId}/{keyword}:
 *    get:
 *     summary: Search book by keyword
 *     tags: [Book]
 *     parameters:
 *          - $ref : '#/components/parameters/queryTourStyle'
 *          - $ref : '#/components/parameters/queryTourRegion'
 *          - $ref : '#/components/parameters/queryKeyword'
 *     responses:
 *          "200":
 *              description: Success
 */
router.get('/search/:tour_style/:TourRegionId/:keyword', bookController.searchBook)
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
 *            multipart/form-data:
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
router.patch('/:id', upload.single('book_img'), bookController.updateBookById) // 특정 book 업데이트
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
