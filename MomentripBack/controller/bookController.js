const bookService = require('../service/bookService');
module.exports={
    registerBook: async (req, res) => {
        const book_img = req.file.key; //이미지 하나 올리기 코드
        const {
            book_title,
            trip_start_date,
            trip_end_date,
            book_public,
            book_hit,
            CategoryId,
            tour_style,
            TourRegionId,
            UserId
        } = req.body;
        await bookService.register(
            book_title,
            trip_start_date,
            trip_end_date,
            book_img,
            book_public,
            book_hit,
            CategoryId,
            tour_style,
            TourRegionId,
            UserId,
            res);
        return res;
    },
    findAllBook : async (req, res) =>{
        await bookService.findAll(res);
        return res;
    },
    findBookById : async (req, res)=>{
        const{ id } = req.params
        await bookService.findBookById(id, res);
        return res;
    },
    findBookByCategoryId : async (req, res) =>{
        const {
            category_id
        } = req.params;
        await bookService.findBookByCategoryId(category_id,res);

        return res;
    },
    findBookByUserId : async (req, res) => {
        const {user_id} = req.params;
        await bookService.findBookByUserId(user_id, res);
        return res
    }
    ,
    findFollowingUserBook : async (req,res) => {
        const {
            user_id,
        } = req.params;
        await bookService.findFollowingUserBook(user_id, res);
        return res;
    },
    searchBook : async (req, res) =>{
        const{
            tour_style, TourRegionId, keyword
        } = req.params;
        await bookService.searchBook(tour_style, TourRegionId, keyword, res);
        return res;
    },
    updateBookById : async (req, res) =>{
        const book_img = req.file.key; //이미지 하나 올리기 코드
        const { id } = req.params;
        const {
            book_title,
            book_public,
            trip_start_date,
            trip_end_date,
            tour_style,
            TourRegionId,
        } = req.body;
        await bookService.updateBook(
            id,
            book_title,
            book_img,
            book_public,
            trip_start_date,
            trip_end_date,
            tour_style,
            TourRegionId,
            res)
        return res;
    },
    deleteBook : async (req, res) =>{
        const { id } = req.params;
        await bookService.deleteBook(id, res);
        return res;
    }
}
