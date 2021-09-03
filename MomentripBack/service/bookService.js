const { sequelize } = require('../models');
const statusCode = require("../modules/statusCode");
const responseMessage = require('../modules/responseMessage');
const bookMethod = require('../method/bookMethod');
const util = require("../modules/util")
// const {Util}
module.exports = {
    register : async (
        bookTitle,
        bookImgFile,
        bookPublic,
        bookHit,
        res
    ) =>{
        if( !bookTitle || !bookImgFile || !bookPublic || !bookHit){
            console.log("필요값 누락");

            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try{
            const book = await bookMethod.register(bookTitle, bookImgFile, bookPublic, bookHit);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.REGISTER_BOOK_SUCCESS, book))
        }catch(err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.REGISTER_BOOK_FAIL));
        }
    },
    findAll : async (res) => {
        try {
            const books = await bookMethod.findAll();
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_ALL_BOOK_SUCCESS, books));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.OK, responseMessage.FIND_ALL_BOOK_FAIL));
        }
    },
    findBookById : async (id, res)=> {
        if(!id){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try {
            const book = await bookMethod.findById(id);
            if(!book){
                console.log("해당 배너가 존재하지 않습니다.");
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_EXIST_BOOK))
            }

            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_BOOK_BY_ID_SUCCESS, book));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_BOOK_BY_ID_FAIL));
        }
    },
    findBookByUserId : async (user_id, res) => {
        if(!user_id){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE))
        }
        //유저 찾는 함수 집어넣기
        // if(!user){}
        try{
            const books = await bookMethod.findByUserId(user_id);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_BOOK_BY_ID_SUCCESS, books));
        }catch(err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_BOOK_BY_USER_ID_FAIL));
        }
    },
    updateBook : async (id,
        bookTitle,
        bookImg,
        bookPublic,
        bookHit,
        res) => {
        if(!id || !bookTitle || !bookImg || bookPublic || bookHit || res){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try{
            const curBook = await bookMethod.findById(id);
            if(!curBook){
                console.log("해당 모멘트북이 존재하지 않습니다.");
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.UPDATE_BOOK_FAIL));
            }
            const book = await bookMethod.update(id, bookTitle, bookImg, bookPublic, bookHit);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_BOOK_SUCCESS, {id}));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_BOOK_FAIL));
        }
    },
    deleteBook : async (id, res) => {
        if(!id){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try {
            const curBook = await bookMethod.findById(id);
            if(!curBook){
                console.log("해당 모멘트북이 존재하지 않습니다.");
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.UPDATE_BOOK_FAIL));
            }
            const book = await bookMethod.delete(id);
            return res.status(statusCode.BAD_REQUEST).send(util.success(statusCode.BAD_REQUEST, responseMessage.DELETE_ACCOUNT_SUCCESS, {id}));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_ACCOUNT_FAIL));
        }
    }
}