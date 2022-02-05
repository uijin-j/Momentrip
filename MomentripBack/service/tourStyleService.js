/*
const util = require("../modules/util")
const statusCode = require("../modules/statusCode");
const responseMessage = require('../modules/responseMessage');
const tourStyleMethod = require('../method/tourStyleMethod');

module.exports = {
    findByTourStyle: async (tourStyles) => {
        try {
            const tour_style = await tourStyleMethod.findByTourStyle(tourStyles);
            //res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.TourStyle_REGISTER_SUCCESS, tour_style));
            return tour_style;
        } catch (err) {
            console.error(err);
            //res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.BAD_REQUEST, responseMessage.HASHTAG_REGISTER_FAIL));
            return err;
        }
    }
}
*/
