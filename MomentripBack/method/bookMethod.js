const{
    Book
}= require('../models');
const {
    Op
} = require("sequelize");

module.exports ={
    register : async(
        bookTitle,
        bookImgFile,
        bookPublic,
        bookHit)=>{
        try{
            console.log("Book.create 시작!!!!!!!!!~!~!~!~!");
            const book = await Book.create({
                book_title : bookTitle,
                book_img: bookImgFile,
                book_public : bookPublic,
                book_hit : bookHit,
            })
            console.log("Book.create 성공!");
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
        bookTitle,
        bookImg,
        bookPublic,
        bookHit,
    ) => {
        try {
            await Book.update({
                book_title : bookTitle,
                book_img : bookImg,
                book_public : bookPublic,
                book_hit : bookHit,
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
