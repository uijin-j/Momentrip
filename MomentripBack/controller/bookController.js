const bookService = require('../service/bookService');
module.exports={
    /**
     *  @swagger
     *  tags:
     *    name: Book
     *    description: API to check your Book.
     */
    /**
     * @swagger
     * paths:
     *  /momentrip/book:
     *   post:
     *      summary: Creat your book
     *      tags : [Book]
     *      requestBody:
     *          required: true
     *          content:
     *            application/json:
     *              schema:
     *                  $ref: '#/components/schemas/Book'
     *      responses:
     *        200:
     *              description: Success
     *        400:
     *              description: Error
     *        500:
     *              description: Fail
     *   get:
     *      summary: Check all book
     *      tags: [Book]
     *      requestBody:
     *      responses:
     *        200:
     *              description: Success
     *        400:
     *              description: Error
     *        500:
     *              description: Fail
     */
    registerBook: async (req, res) => {
        // const bookImgFile = req.file; //원래 코드
        const book_img = "Test.jpg"; //임시 코드
        const {
            book_title,
            book_public,
            book_hit,
            UserId,
        } = req.body;
        await bookService.register(
            book_title,
            book_img,
            book_public,
            book_hit,
            UserId,
            res);
        return res;
    },
    findAllBook : async (req, res) =>{
        await bookService.findAll(res);

        return res;
    },
    /**
     * @swagger
     *  paths:
     *   /momentrip/book/select/{id}:
     *    get:
     *      summary: Check book by book_id
     *      tags: [Book]
     *      parameters:
     *       - in: path
     *         name: id
     *         schema:
     *          type: number
     *         required: true
     *         description: Numeric ID of book to get
     *      responses:
     *        200:
     *              description: Success
     *        400:
     *              description: Error
     *        500:
     *              description: Fail
     */
    findBookById : async (req, res)=>{
        const{
            id
        } = req.params
        await bookService.findBookById(id, res);
        return res;
    },
    /**
     * @swagger
     * paths:
     *  /momentrip/book/user/all/{user_id}:
     *    get:
     *     summary: Check book by user_id
     *     tags: [Book]
     *     parameters:
     *      - in: path
     *        name: user_id
     *        schema:
     *          type: integer
     *        required: true
     *        description: Book list of user
     *     responses:
     *          "200":
     *              description: Success
     *          "400":
     *              description: Error
     *          "500":
     *              description: Fail
     */
    searchBookByUserId : async (req, res) =>{
        const {
            user_id
        } = req.params;
        await bookService.findBookByUserId(user_id,res);

        return res;
    },
    /**
     * @swagger
     * paths:
     *  /momentrip/book/{id}:
     *    patch:
     *      summary: Update book by book Id
     *      tags: [Book]
     *      requestBody:
     *          required: true
     *          content:
     *            application/json:
     *              schema:
     *                  $ref: '#/components/schemas/Book'
     *      parameters:
     *       - in: path
     *         name: id
     *         schema:
     *          type: integer
     *         required: true
     *         description: Id of updated book
     *      responses:
     *          "200":
     *              description: Success
     *          "400":
     *              description: Error
     *          "500":
     *              description: Fail
     */
    updateBookById : async (req, res) =>{
        // let book_img = req.file;
        let book_img = "update img";
        const { id } = req.params;
        const {
            book_title,
            book_public,
            book_hit,
            img
        } = req.body;
        if (!book_img) {
            book_img = img;         //img는 프론트에서 주는 기본 이미지
        }
        await bookService.updateBook(
            id,
            book_title,
            book_img,
            book_public,
            book_hit,
            res)
        return res;
    },
    /**
     * @swagger
     * paths:
     *  /momentrip/book/{id}:
     *    delete:
     *     summary: delete book by book Id
     *     tags: [Book]
     *     parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: integer
     *        required: true
     *        description: Id of deleted book
     *     responses:
     *          "200":
     *              description: Success
     *          "400":
     *              description: Error
     *          "500":
     *              description: Fail
     */
    deleteBook : async (req, res) =>{
        const { id } = req.params;
        await bookService.deleteBook(id, res);

        return res;
    }
}
