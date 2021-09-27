const momentService = require('../service/momentService');

module.exports = {
    /**
     *  @swagger
     *  tags:
     *    name: Moment
     *    description: API to check your moment.
     */
    /**
     *  @swagger
     *  paths:
     *   /momentrip/moment/:
     *     post:
     *       summary: Creat your moment
     *       tags: [Moment]
     *       requestBody:
     *          required: true
     *          content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Moment'
     *       responses:
     *         "200":
     *           description: "Success"
     *         "400":
     *           description: "Error"
     *         "500":
     *           description: "Fail"
     */
    registerMoment : async (req,res) => {
        // const momentImg = req.file;
        const momentImg = "MomentTest.jpg";
        const {
            momentTitle,
            momentContent,
            momentPublic,
            UserId,
            BookId
        } = req.body;

        await momentService.register(
            momentTitle,
            momentContent,
            momentImg,
            momentPublic,
            UserId,
            BookId,
            res);
        return res;
    },
    /**
     *  @swagger
     *  paths:
     *   /momentrip/moment/:
     *     get:
     *       summary: Check your all moments
     *       tags: [Moment]
     *       responses:
     *         "200":
     *           description: "Success"
     *         "400":
     *           description: "Error"
     *         "500":
     *           description: "Fail"
     */
    findAllMoment : async (req,res) => {
        await momentService.findAll(res);

        return res;
    },
    /**
     *  @swagger
     *  paths:
     *   /momentrip/moment/select/{id}:
     *     get:
     *       summary: Check your moment
     *       tags: [Moment]
     *       parameters:
     *          - in: path
     *            name: id
     *            schema:
     *              type: integer
     *            required: true
     *            description: Numeric ID of the moment to get
     *       responses:
     *         "200":
     *           description: "Success"
     *         "400":
     *           description: "Error"
     *         "500":
     *           description: "Fail"
     */
    findMomentById : async (req,res) => {
        const {id} = req.params;
        await momentService.findMomentById(id,res);
        return res;
    },
    /**
     *  @swagger
     *  paths:
     *   /momentrip/moment/user/all/{user_id}:
     *     get:
     *       summary: Check your moment
     *       tags: [Moment]
     *       parameters:
     *          - in: path
     *            name: user_id
     *            schema:
     *              type: integer
     *            required: true
     *            description: Numeric ID of the user to get
     *       responses:
     *         "200":
     *           description: "Success"
     *         "400":
     *           description: "Error"
     *         "500":
     *           description: "Fail"
     */
    findMomentByUserId : async (req, res)=> {
        const {user_id} = req.params;
        await momentService.findMomentByUserId(user_id, res);
        return res;
    },
    /**
     *  @swagger
     *  paths:
     *   /momentrip/moment/book/all/{book_id}:
     *     get:
     *       summary: Check your moment
     *       tags: [Moment]
     *       parameters:
     *          - in: path
     *            name: book_id
     *            schema:
     *              type: integer
     *            required: true
     *            description: Numeric ID of the book to get
     *       responses:
     *         "200":
     *           description: "Success"
     *         "400":
     *           description: "Error"
     *         "500":
     *           description: "Fail"
     */
    findAllMomentByOneBook : async (req,res) => {
        const { book_id } = req.params;
        await momentService.findByOneBook(book_id,res);

        return res;
    },
    /**
     *  @swagger
     *  paths:
     *   /momentrip/moment/{id}:
     *     patch:
     *       summary: Update your moment
     *       tags: [Moment]
     *       parameters:
     *          - in: path
     *            name: id
     *            schema:
     *              type: integer
     *            required: true
     *            description: Numeric ID of the moment to update
     *       requestBody:
     *          required: true
     *          content:
     *           application/json:
     *             schema:
     *               properties:
     *                 momentTitle:
     *                  type: string
     *                 momentContent:
     *                  type: string
     *                 momentImg:
     *                  type: string
     *                 momentPublic:
     *                  type: boolean
     *       responses:
     *         "200":
     *           description: "Success"
     *         "400":
     *           description: "Error"
     *         "500":
     *           description: "Fail"
     */
    updateMomentById : async (req,res) => {
        const {
            id
        } = req.params;
        // let momentImg = req.files;
        let momentImg = "update.img";
        const {
            momentTitle,
            momentContent,
            defaultImg,
            momentPublic,
        } = req.body;
        if(!momentImg){
            momentImg = defaultImg;
        }
        await momentService.updateMoment(
            id,
            momentTitle,
            momentContent,
            momentImg,
            momentPublic,
            res);
        return res;
    },
    /**
     *  @swagger
     *  paths:
     *   /momentrip/moment/{id}:
     *     delete:
     *       summary: Delete your moment
     *       tags: [Moment]
     *       parameters:
     *          - in: path
     *            name: id
     *            schema:
     *              type: integer
     *            required: true
     *            description: Numeric ID of the moment to get
     *       responses:
     *         "200":
     *           description: "Success"
     *         "400":
     *           description: "Error"
     *         "500":
     *           description: "Fail"
     */
    deleteMomentById : async (req,res) => {
        const {
            id
        } = req.params;
        await momentService.deleteMoment(id,res);

        return res;
    }
}















