const {
    Moment
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
        UserId,
        BookId
    ) => {
        try{
            console.log(UserId, BookId);
            const moment = await Moment.create({
                moment_title : momentTitle,
                moment_content : momentContent,
                moment_img : momentImg,
                moment_public : momentPublic,
                UserId,
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
    findByUserId : async (UserId)  => {
        try{
            const moment = Moment.findOne({where : {UserId}});
            return moment;
        }catch(err){
            throw err;
        }
    },
    findByOneBook : async (BookId) => {
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
