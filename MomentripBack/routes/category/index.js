const express = require('express');
const router = express.Router();
const categoryController = require('../../controller/categoryController');

const authCheck = require('../../middleware/authCheck');

/**
 * @swagger
 * tags :
 *   name : Category
 *   description : API to check Category
 */
/**
 * @swagger
 *  paths :
 *    /momentrip/category:
 *      post:
 *        summary : Create your category
 *        tags : [Category]
 *        requestBody:
 *          required : true
 *          content:
 *              application/json:
 *                  schema :
 *                      $ref: '#/components/schemas/CategoryPost'
 *        responses:
 *          200:
 *              description : Success
 */
router.post('/', categoryController.registerCategory);
/**
 * @swagger
 *  paths :
 *    /momentrip/category/{user_id}:
 *      get:
 *        summary: Check your Category
 *        tags : [Category]
 *        parameters:
 *          - $ref : '#/components/parameters/queryUserId'
 *        responses:
 *          "200" :
 *              description : Success
 */
router.get('/:user_id', categoryController.findCategoryByUserId);
/**
 * @swagger
 *  paths :
 *    /momentrip/category/{id}:
 *      patch :
 *        summary: update your category
 *        tags : [Category]
 *        parameters:
 *           - $ref : '#/components/parameters/queryId'
 *        requestBody:
 *          required : true
 *          content:
 *              application/json:
 *                  schema :
 *                      $ref: '#/components/schemas/CategoryUpdate'
 *        responses:
 *            200:
 *              description : Success
 */
router.patch('/:id', categoryController.updateCategory);
/**
 * @swagger
 *  paths :
 *    /momentrip/category/{id}:
 *     delete:
 *        summary: delete your category
 *        tags : [Category]
 *        parameters:
 *           - $ref : '#/components/parameters/queryId'
 *        responses:
 *            200:
 *              description : Success
 */
router.delete('/:id', categoryController.deleteCategory);


module.exports = router;