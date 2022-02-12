const{
    Book, BookTourStyle
}= require('../models');

const {
    Op
} = require("sequelize");

module.exports = {
    defaultRegister : async (CategoryId)=>{
        try{
            const book = await Book.create({
                book_title : "momentrip_default_Book",
                book_img : "noImage",
                book_public : true,
                book_hit : 0,
                trip_start_date : "",
                trip_end_date : "",
                CategoryId : CategoryId,
                // TourRegionId,
            })
            return book;
        }catch (err){
            throw err;
        }
    },
    register : async(
        book_title,
        book_img,
        book_public,
        trip_start_date,
        trip_end_date,
        book_hit,
        CategoryId,
        tour_style,
        TourRegionId,
    )=>{
        try{
            book_img = "https://momentrip1.s3.ap-northeast-2.amazonaws.com/"+book_img;
            const book = await Book.create({
                book_title,
                book_img,
                book_public,
                book_hit,
                trip_start_date,
                trip_end_date,
                CategoryId,
                TourRegionId,
            })
            const tourStyle = tour_style.split(",");
            for(const property in tourStyle){
                await BookTourStyle.create({
                    BookId : book.id,
                    TourStyleId : tourStyle[property],
                })
            }
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
    findById : async (id)=>{
        try{
            const book = await Book.findOne({ where : { id }});
            return book;
        }catch (err){
            throw err;
        }
    },
    findByCategoryId : async (CategoryId) =>{
        try {
            const books = await Book.findAll({where : {CategoryId}});
            return books;
        }catch (err){
            throw err;
        }
    },
    /*findByUserId : async (following_id) => {

    },*/
    searchBook : async (tour_style, TourRegionId, keyword) => {
        try{
            const region_keyword_books = await Book.findAll(
                {where : {[Op.and] : [
                        {book_title : {[Op.like] : "%" + keyword + "%"}},
                        {TourRegionId}]
                }
            });// region 필터링, keyword 검색 결과된 books
            const tourStyle = tour_style.split(",");
            const bookId = await BookTourStyle.findAll({
                where: { TourStyleId : tourStyle },
                attributes: ['BookId']})
            //tourStyle 필터링된 book id 들
            const set = new Set;
            for(const property in bookId) set.add(bookId[property].BookId);
            const tourStyle_books = Array.from(set)
            //tourStyle 필터링, 중복 제거된 book id 들
            const resultBooks = []
            for (const property in region_keyword_books){
                if(tourStyle_books.includes(region_keyword_books[property].id))
                    resultBooks.push(region_keyword_books[property]);
            }
            return resultBooks;
        }catch (err){
            throw err;
        }
    },
    update: async (
        id,
        book_title,
        book_img,
        book_public,
        trip_start_date,
        trip_end_date,
        tour_style,
        TourRegionId,
    ) => {
        try {
            book_img = "https://momentrip1.s3.ap-northeast-2.amazonaws.com/"+book_img;
            const book = await Book.update({
                book_title,
                book_img,
                book_public,
                trip_start_date,
                trip_end_date,
                TourRegionId,
            }, {where: { id }});
            const tourStyle = tour_style.split(",");
            BookTourStyle.destroy({
                where : {BookId : id},
                truncate : true,
            })
            for(const property in tourStyle){
                await BookTourStyle.create({
                    BookId : id,
                    TourStyleId : tourStyle[property]
                })
            }
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
