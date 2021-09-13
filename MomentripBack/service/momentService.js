const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const responseMessage = require('../modules/responseMessage');
const momentMethod = require('../method/momentMethod');
const bookMethod = require('../method/bookMethod');

module.exports = {
    register : async (
        momentTitle,
        momentContent,
        momentPublic,
        momentImg,
        res
    ) => {
        // 예외처리 조건 입력 해야됨
        if(!momentPublic){
            console.log('공개범위를 설정해야 합니다');

            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
            return;
        }

        if(momentTitle.length > 100){
            console.log('제목 길이 초과');
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.MOMENT_TITLE_TOO_LONG));

            return;
        }

        if(momentContent.length > 300){
            console.log('내용 길이 초과');
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.MOMENT_CONTENT_TOO_LONG));

            return;
        }

        try{
            const moment = await momentMethod.register(
                momentTitle,
                momentContent,
                momentPublic,
                momentImg,
            );
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MOMENT_REGISTER_SUCCESS, moment));

            return;
        }catch(err){
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.BAD_REQUEST,responseMessage.MOMENT_REGISTER_FAIL));

            return;
        }
    },
    findAll : async (res) => {
        try{
            const moments = await momentMethod.findAll();
            res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.FIND_ALL_MOMENTS_SUCCESS));

            return res;
        }catch(err) {
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FIND_ALL_MOMENTS_FAIL));

            return res;
        }
    },
    findMomentById : async (id,res) =>{
        if(!id){
            console.log('id 없음');

            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE));
            return res;
        }
        try {
            const moment = await momentMethod.findById(id);
            if(!moment){
                console.log('해당 moment 가 존재하지 않습니다.');
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_EXIST_MOMENT));

                return;
            }

            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.FIND_MOMENT_BY_ID_SUCCESS,moment));
        }catch(err){
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.FIND_MOMENT_BY_ID_FAIL));

            return;
        }
    },
    findMomentByUserId : async (user_id,res) => {
      if(!user_id){
          console.log('user_id 없음');

          res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
          return res;
      }

      try{
          const moment = await momentMethod.findByUserId(user_id);
          if(!moment){
              console.log('해당 user가 작성한 moment가 존재하지 않습니다.');
              res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NO_EXIST_BY_USER_ID_MOMENT));

              return;
          }
          res.status(statusCode.OK).send(util.fail(statusCode.OK,responseMessage.FIND_MOMENT_BY_USER_ID_SUCCESS,moment));
      }catch(err){
          console.error(err);
          res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.FIND_MOMENT_BY_USER_ID_FAIL));
      }
    },
    findByOneBook : async (book_id, res) => {
        if(!book_id){
            console.log('book_id 없음');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }

        try{
        const book = await bookMethod.findById(book_id);
        if(!book){
            console.log('해당하는 Book 이 존재하지 않습니다.');
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NO_BOOK));

            return;
        }
        const moments = await momentMethod.findByOneBook(book_id);
        res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.FIND_ALL_MOMENTS_BY_ONE_BOOK_SUCCESS,moments));

        return;
        }catch(err){
        console.error(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.FIND_ALL_MOMENTS_BY_ONE_BOOK_FAIL));

        return;
        }
    },
    updateMoment : async (
        id,
        momentTitle,
        momentContent,
        momentImg,
        momentPublic,
        res) => {
        if(!momentPublic){
            console.log('공개범위를 설정해야 합니다');

            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        if(momentTitle.length > 100){
            console.log('제목 길이 초과');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.MOMENT_TITLE_TOO_LONG));
        }

        if(momentContent.length > 300){
            console.log('내용 길이 초과');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.MOMENT_CONTENT_TOO_LONG));
        }

        try {
            const moment = await momentMethod.update(id,momentTitle, momentContent, momentImg,momentImg,momentPublic);

            res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.UPDATE_MOMENT_SUCCESS,moment));
            return;
        }catch(err){
            console.error(err);

            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_MOMENT_FAIL));
            return;
        }

    },

    deleteMoment : async (id,res) => {
        try{
            const moment = await momentMethod.findById(id);
            if(!moment){
                console.log('해당하는 moment 가 없습니다.');
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NO_EXIST_BY_USER_ID_MOMENT));

                return;
            }
            await momentMethod.delete(id);
            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.DELETE_MOMENT_SUCCESS));

            return;
        }catch(err) {
            console.error(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.DELETE_MOMENT_FAIL));

            return;
        }
    }
}
