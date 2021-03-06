const util = require("../modules/util")
const statusCode = require("../modules/statusCode");
const responseMessage = require('../modules/responseMessage');
const bookMethod = require('../method/bookMethod');
const userMethod = require('../method/userMethod');
const categoryMethod = require('../method/categoryMethod');

module.exports = {
    register : async (
        book_title,
        trip_start_date,
        trip_end_date,
        book_img,
        book_public,
        book_hit,
        CategoryId,
        tour_style,
        TourRegionId,
        UserId,
        res) =>{
        if( !book_title || !book_img){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try{
            const book = await bookMethod.register(book_title,
                book_img,
                book_public,
                trip_start_date,
                trip_end_date,
                book_hit,
                CategoryId,
                tour_style,
                TourRegionId,
                UserId);
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
    findBookByCategoryId : async (category_id, res) => {
        if(!category_id){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE))
        }
        //카테고리 찾는 함수 집어넣기
        // if(!Category){}
        try{
            const books = await bookMethod.findByCategoryId(category_id);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_BOOK_BY_CATEGORY_ID_SUCCESS, books));
        }catch(err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_BOOK_BY_CATEGORY_ID_FAIL));
        }
    },
    findBookByUserId : async (user_id, res) => {
        if(!user_id){
            console.log("필요값 누락")
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE))
        }
        try{
            const books = await bookMethod.findBookByUserId(user_id);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_BOOK_BY_USER_ID_SUCCESS, books));
        }catch (err){
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INT))
        }
    },
    findFollowingUserBook : async (user_id, res) => {
        if(!user_id){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE))
        }
        try{
            const user = [];
            const followingUser = await userMethod.findUserFollow(user_id);
            for( const property in followingUser.following) user.push(followingUser.following[property].id)
            let books = [];
            for(const property in user)
                books = books.concat([] , await bookMethod.findBookByUserId(user[property]));
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_BOOK_BY_ID_SUCCESS, books));
        }
        catch(err){
            console.log(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_BOOK_BY_USER_ID_FAIL));
        }
    },
    searchBook : async (tour_style, TourRegionId, keyword, res) =>{
      if(!tour_style || !TourRegionId || !keyword){
          console.log("필요값누락");
          return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
      }
      try{
          const books = await bookMethod.searchBook(tour_style, TourRegionId, keyword);
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
        tour_style,
        TourRegionId,
        res) => {
        if(!id || !book_title || !book_img || !book_public || !trip_end_date || ! trip_start_date || !tour_style || !TourRegionId){
            console.log("필요값 누락");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try{
            const curBook = await bookMethod.findById(id);
            if(!curBook){
                console.log("해당 모멘트북이 존재하지 않습니다.");
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
            }
            const book = await bookMethod.update(id, book_title, book_img, book_public, trip_start_date, trip_end_date, tour_style, TourRegionId,);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_BOOK_SUCCESS, book));
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
