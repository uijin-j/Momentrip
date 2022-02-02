/*
const tourStyleMethod = require('../method/tourStyleMethod');

module.exports = {
    register: async (
        tourStyle
    ) => {
        try {
            const tour_style = await tourStyleMethod.register(
                tourStyle
            );
            //res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.HASHTAG_REGISTER_SUCCESS, hashtag));
            return tour_style;
        } catch (err) {
            console.error(err);
            //res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.BAD_REQUEST, responseMessage.HASHTAG_REGISTER_FAIL));
            return err;
        }
    }
}
*/
