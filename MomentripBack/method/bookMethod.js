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
        UserId)=>{
        try{
            const book = await Book.create({
                book_title,
                book_img,
                book_public,
                UserId
            })
            return book;
        }catch (err){
            throw err;
        }
    },
    findById : async (id)=>{
        try{
            const book = await Book.findOne({ where : { id }});
            return book;
        }catch (err){
            throw err;
        }
    },
    findAll : async () => {
        try{
            const books = await Book.findAll();
            return books;
        }catch (err){
            throw err;
        }
    },
    findByUserId : async (UserId) =>{
        try {
            const books = await Book.findAll({where : {UserId}});
            return books;
        }catch (err){
            throw err;
        }
    },
    searchBook : async (keyword) => {
      try{
          const books = await Book.findAll({where : {book_title : {[Op.like] : "%" + keyword + "%"}}})
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
    ) => {
        try {
            const book = await Book.update({
                book_title,
                book_img,
                book_public,
            }, {
                where: {
                    id
                }
            });
            return book;
        } catch (err) {
            throw err;
        }
    },
    delete : async (id) => {
        try {
            await Book.destroy( {where : {id}});
        } catch (err) {
            throw err;
        }
    },
}
