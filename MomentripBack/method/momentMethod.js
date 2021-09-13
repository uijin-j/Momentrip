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
        momentPublic,
        momentImg,
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
        momentPublic,
        momentImg
    ) => {
        try{
            await Moment.update({
                momentTitle,
                momentContent,
                momentPublic,
                momentImg
            }, { where : {id}})
            return moment;
        }catch(err){
            throw err;
        }
    },
    delete : async (id) => {
        try {
            await Moment.delete({where:id});
        }catch(err){
            throw err;
        }
    }
}
