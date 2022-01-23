const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const responseMessage = require('../modules/responseMessage');
const hashtagMethod = require('../method/hashtagMethod');

module.exports = {
    register: async (
        hashtagTitle
    ) => {
        try {
            const hashtag = await hashtagMethod.register(
                hashtagTitle
            );
            //res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.HASHTAG_REGISTER_SUCCESS, hashtag));
            return hashtag;
        } catch (err) {
            console.error(err);
            //res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.BAD_REQUEST, responseMessage.HASHTAG_REGISTER_FAIL));
            return err;
        }
    }
}
