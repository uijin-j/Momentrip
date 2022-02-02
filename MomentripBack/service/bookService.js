const util = require("../modules/util")
const statusCode = require("../modules/statusCode");
const responseMessage = require('../modules/responseMessage');
const bookMethod = require('../method/bookMethod');
const userController = require('../controller/userController');

module.exports = {
    register : async (
        book_title,
        trip_start_date,
        trip_end_date,
        book_img,
        book_public,
        book_hit,
        UserId,
        res) =>{
        if( !book_title || !book_img || !book_public || !UserId){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try{
            const book = await bookMethod.register(book_title, trip_start_date, trip_end_date, book_img, book_public, book_hit, UserId);
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
    findBookByFollowingId : async (user_id, res) => {
        if(!user_id){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE))
        }
        try{
            const following_id = await userController.findFollowingById(user_id);
            const book = await bookMethod.findByUserId(following_id);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_BOOK_BY_ID_SUCCESS, book));
        }
        catch(err){
            console.log(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_BOOK_BY_USER_ID_FAIL));
        }
    },
    searchBook : async (keyword, res) =>{
      if(!keyword){
          console.log("필요값누락");
          return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.SEARCH_BOOK_FAIL))
      }
      try{
          const books = await bookMethod.searchBook(keyword);
          return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SEARCH_BOOK_SUCCESS, books));
      }catch (err){
          console.error(err);
          return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SEARCH_BOOK_FAIL));
      }
    },
    updateBook : async (id,
        book_title,
        book_img,
        book_public,
        trip_start_date,
        trip_end_date,
        res) => {
        if(!id || !book_title || !book_img ){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try{
            const curBook = await bookMethod.findById(id);
            if(!curBook){
                console.log("해당 모멘트북이 존재하지 않습니다.");
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.UPDATE_BOOK_FAIL));
            }
            const book = await bookMethod.update(id, book_title, book_img, book_public, trip_start_date, trip_end_date);
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
            await bookMethod.delete(id);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.DELETE_BOOK_SUCCESS, {id}));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_ACCOUNT_FAIL));
        }
    }
}
