const {
    Moment, Category, Book
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
