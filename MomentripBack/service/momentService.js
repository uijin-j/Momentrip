const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const responseMessage = require('../modules/responseMessage');
const momentMethod = require('../method/momentMethod');
const bookMethod = require('../method/bookMethod');

module.exports = {
    register : async (
        momentTitle,
        momentContent,
        momentImg,
        momentPublic,
        BookId,
        res
    ) => {
        if( !momentTitle|| !momentContent || !momentPublic || !momentImg || !BookId){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try{
            const moment = await momentMethod.register(
                momentTitle,
                momentContent,
                momentImg,
                momentPublic,
                BookId
            );
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MOMENT_REGISTER_SUCCESS, moment));
        }catch(err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.BAD_REQUEST,responseMessage.MOMENT_REGISTER_FAIL));
        }
    },
    findAll : async (res) => {
        try{
            const moments = await momentMethod.findAll();
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.FIND_ALL_MOMENTS_SUCCESS, moments));
        }catch(err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_ALL_MOMENTS_FAIL));
        }
    },
    findMomentById : async (id,res) =>{
        if(!id){
            console.log('필요값 누락');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE));
        }
        try {
            const moment = await momentMethod.findById(id);
            if(!moment){
                console.log('해당 moment 가 존재하지 않습니다.');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_EXIST_MOMENT));
            }
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_MOMENT_BY_ID_SUCCESS,moment));
        }catch(err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.FIND_MOMENT_BY_ID_FAIL));
        }
    },
    findUserIndividualMoment : async (user_id,res) => {
        if(!user_id){
            console.log('필요값 누락');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try{
            const moments = await momentMethod.findUserIndividualMoment(user_id);
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.FIND_MOMENT_BY_USER_ID_SUCCESS, moments));
        }catch(err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.FIND_MOMENT_BY_USER_ID_FAIL));
        }
    },
    findMomentByBook : async (book_id, res) => {
        if(!book_id){
            console.log('필요값 누락');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try{
            const book = await bookMethod.findById(book_id);
            if(!book){
                console.log('해당하는 Book 이 존재하지 않습니다.');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.OUT_OF_VALUE));
            }
            const moments = await momentMethod.findMomentByBook(book_id);
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.FIND_ALL_MOMENTS_BY_ONE_BOOK_SUCCESS,moments));
        }catch(err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.FIND_ALL_MOMENTS_BY_ONE_BOOK_FAIL));
        }
    },
    searchMoment : async (keyword, res) => {
        if(!keyword){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try{
            const moments = await momentMethod.searchMoment(keyword);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SEARCH_MOMENT_SUCCESS, moments));
        }catch (err){
            console.err(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SEARCH_MOMENT_FAIL));
        }

    },
    updateMoment : async (
        id,
        momentTitle,
        momentContent,
        momentImg,
        momentPublic,
        res) => {
        if( !momentTitle|| !momentContent || !momentImg || !momentPublic){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try {
            const moment = await momentMethod.update(id,momentTitle, momentContent, momentImg,momentPublic);
            res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.UPDATE_MOMENT_SUCCESS,{id}));
            return;
        }catch(err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_MOMENT_FAIL));
        }
    },
    deleteMoment : async (id,res) => {
        try{
            const moment = await momentMethod.findById(id);
            if(!moment){
                console.log('해당하는 moment 가 없습니다.');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NO_EXIST_BY_USER_ID_MOMENT));
            }
            await momentMethod.delete(id);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.DELETE_MOMENT_SUCCESS));
        }catch(err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.DELETE_MOMENT_FAIL));
        }
    }
}
