const{
    Book, sequelize
}= require('../models');
const {
    Op
} = require("sequelize");

module.exports ={
    register : async(
        bookTitle,
        bookImg,
        bookPublic,
        bookHit,
        bookStartDate,
        bookEndDate)=>{
        try{
            const book = await Book.create({
                bookTitle,
                bookImg,
                bookPublic,
                bookHit,
                bookStartDate,
                bookEndDate
            })
            return book;
        }catch (err){
            throw err;
        }
    },
    findById : async (id)=>{
        try{
            const book = Book.findOne({ where : { id }});
            return book;
        }catch (err){
            throw err;
        }
    },
    findAll : async () => {
        try{
            const books = Book.findAll();
            return books;
        }catch (err){
            throw err;
        }
    },
    update: async (
        id,
        bookTitle,
        bookImg,
        bookPublic,
        bookHit,
        bookStartDate,
        bookEndDate
    ) => {
        try {
            await Book.update({
                bookTitle,
                bookImg,
                bookPublic,
                bookHit,
                bookStartDate,
                bookEndDate
            }, {
                where: {
                    id
                }
            });

        } catch (err) {
            throw err;
        }
    },
    search: async (title) => {
        try {
            const books = await Book.findAll({
                where: {
                    name: {
                        [Op.like]: "%" + title + "%"
                    },
                    // isDeleted: false
                }
            });
            return books;
        } catch (err) {
            throw err;
        }
    },
}