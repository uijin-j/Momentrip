const {
    Hashtag
} = require('../models');
const {
    Op
} = require("sequelize");

module.exports = {
    register : async (
        hashtagTitle
    ) => {
        try {
            console.log(hashtagTitle.hashtag_title);
            const hashtag = await Hashtag.create({
                hashtag_title : hashtagTitle.hashtag_title,
            })
            return hashtag;
        }catch(err){
            throw err;
        }
    }
}
