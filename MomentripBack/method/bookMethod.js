const{
    Book
}= require('../models');
const {
    Op
} = require("sequelize");

module.exports ={
    register : async(
        book_title,
        book_img,
        book_public,
        book_hit,
        UserId)=>{
        try{
            const book = await Book.create({
                book_title,
                book_img,
                book_public,
                book_hit,
                UserId
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
    findByUserId : async (user_id) =>{
        try {
            const books = await Book.findAll({where : {UserId}});
            return books;
        }catch (err){
            throw err;
        }
    },
    update: async (
        id,
        book_title,
        book_img,
        book_public,
        book_hit,
    ) => {
        try {
            await Book.update({
                book_title,
                book_img,
                book_public,
                book_hit,
            }, {
                where: {
                    id
                }
            });

        } catch (err) {
            throw err;
        }
    },
    delete : async (id) => {
        try {
            const book = await Book.destroy( {where : {id}});
            return book;
        } catch (err) {
            throw err;
        }
    },
}
