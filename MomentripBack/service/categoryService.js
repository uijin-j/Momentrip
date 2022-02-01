const util = require("../modules/util")
const statusCode = require("../modules/statusCode");
const responseMessage = require('../modules/responseMessage');
const categoryMethod = require('../method/categoryMethod');

module.exports = {
    registerCategory : async (category_value, UserId, res) =>{
        if(!category_value || !UserId){
            console.log(category_value);
            console.log(UserId);
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE))
        }
        try{
            const category = categoryMethod.register(category_value, UserId);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.REGISTER_CATEGORY_SUCCESS, category));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.REGISTER_CATEGORY_FAIL));
        }
    },
    findCategoryByUserId : async (user_id, res) => {
        if(!user_id){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE))
        }
        try{
            const categories = await categoryMethod.findByUserId(user_id);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_CATEGORY_BY_USER_ID_SUCCESS, categories));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_CATEGORY_BY_USER_ID_FAIL));
        }
    },
    updateCategory : async (id, category_value, res) => {
        if(!id || !category_value){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try{
            const category = await categoryMethod.update(id, category_value);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_Category_SUCCESS, category));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_Category_FAIL));
        }
    },
    deleteCategory : async (id, res) => {
        if(!id){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try{
            await categoryMethod.delete(id);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.DELETE_Category_SUCCESS, "1"));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_Category_FAIL));
        }
    }
}