const {
    Moment, Category, Book, Hashtag, MomentHashtag
} = require('../models');
const {
    Op
} = require("sequelize");

module.exports = {
    register : async(
        momentTitle,
        momentContent,
        momentImg,
        momentPublic,
        BookId
    ) => {
        try{
            const moment = await Moment.create({
                moment_title : momentTitle,
                moment_content : momentContent,
                moment_img : momentImg,
                moment_public : momentPublic,
                BookId
            })

            const hashtags = momentContent.match(/#[^s#]*/g);
            if(hashtags){
                //findOrCreate : 조회 후 있으면 조회 하고, 없으면 생성해 중복 저장되지 않게 함
                //findOrCreate는 Promise이기 때문에 Promise.all 하면 result가 나오는 구조
                const result = await Promise.all(hashtags.map(tag => {
                    return Hashtag.findOrCreate({
                        where: { hashtag_title : tag.slice(1).toLowerCase()},
                    })
                }),
            );
                await moment.addHashtags(result.map(r => r[0]));
            }
            return moment;
        }catch(err){
            throw err;
        }
    },
    findAll : async () => {
        try{
            const moments = Moment.findAll();
            return moments;
        }catch(err){
            throw err;
        }
    },
    findById : async(id) => {
        try{
            const moment = Moment.findOne({where : {id}});
            return moment;
        }catch(err){
            throw err;
        }
    },
    findUserIndividualMoment : async (user_id)  => {
        try{
            console.log(user_id);
            const defaultCategory = await Category.findOne({where : {
                [Op.and] : [{UserId : user_id},{category_value : "momentrip_default_Category"}]
                }})
            const defaultBook = await Book.findOne({where : {CategoryId : defaultCategory.id}});
            const moments = await Moment.findAll({where : {BookId : defaultBook.id}});
            return moments;
        }catch(err){
            throw err;
        }
    },
    findMomentByBook : async (BookId) => {
        try {
            const moment = Moment.findAll({where: {BookId}});
            return moment;
        }catch(err){
            throw err;
        }
    },
    searchMoment : async (keyword) => {
        try{
            const hashtags = await Hashtag.findOne({where : {hashtag_title : keyword}});
            const moment_hashtag = await MomentHashtag.findAll({
                where : { hashtagId : hashtags.id},
                attributes : ['MomentId']
            })
            const moments = [];
            for(const property in moment_hashtag) {
                moments[property] = await Moment.findOne(
                    {where : {id : moment_hashtag[property].MomentId}}
                )
            }
            return moments;
        }catch (err){
            throw err;
        }
    },
    update : async(
        id,
        momentTitle,
        momentContent,
        momentImg,
        momentPublic,
    ) => {
        try{
            await Moment.update({
                moment_title: momentTitle,
                moment_content: momentContent,
                moment_img: momentImg,
                moment_public: momentPublic
            }, { where : {id}})
            return id;
        }catch(err){
            throw err;
        }
    },
    delete : async (id) => {
        try {
            await Moment.destroy({where:{id}});
        }catch(err){
            throw err;
        }
    }
}
