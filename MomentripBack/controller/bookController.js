const bookService = require('../service/bookService');
module.exports={
    registerBook: async (req, res) => {
        // const bookImgFile = req.file; //원래 코드
        const book_img = "Test.jpg"; //임시 코드
        const {
            book_title,
            book_public,
            UserId,
        } = req.body;
        await bookService.register(
            book_title,
            book_img,
            book_public,
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
    searchBookByUserId : async (req, res) =>{
        const {
            user_id
        } = req.params;
        await bookService.findBookByUserId(user_id,res);

        return res;
    },
    searchBook : async (req, res) =>{
        const{
            keyword
        } = req.params;
        await bookService.searchBook(keyword, res);
        return res;
    },
    updateBookById : async (req, res) =>{
        // let book_img = req.file;
        let book_img = "update img";
        const { id } = req.params;
        const {
            book_title,
            img,
            book_public,
        } = req.body;
        if (!book_img) {
            book_img = img;         //img는 프론트에서 주는 기본 이미지
        }
        await bookService.updateBook(
            id,
            book_title,
            book_img,
            book_public,
            res)
        return res;
    },
    deleteBook : async (req, res) =>{
        const { id } = req.params;
        await bookService.deleteBook(id, res);
        return res;
    }
}
