const bookService = require('../service/bookService');

module.exports={
    registerBook: async (req, res) => {
        const bookImgFile = req.file;
        const {
            bookTitle,
            bookPublic,
            bookHit,
            bookStartDate,
            bookEndDate
        } = req.body;

        await bookService.register(
            bookTitle,
            bookImgFile,
            bookPublic,
            bookHit,
            bookStartDate,
            bookEndDate,
            res);
        return res;
    },
    findAllBook : async (req, res) =>{
        await bookService.findAll(res);

        return res;
    },
    findBookById : async (req, res)=>{
        const{
            id
        } = req.params
        await bookService.findBookById(id, res);
        return res;
    },
    searchBookByUserId : async (req, res) =>{
        const {
            user_id
        } = req.params;
        await bookService.findBookByUserId(user_id, res);

        return res;
    },
    updateBookById : async (req, res) =>{
        let bookImg = req.file;
        const {
            id,
            bookTitle,
            bookPublic,
            bookHit,
            img,
            bookStartDate,
            bookEndDate
        } = req.body;
        if (!bookImg) {
            bookImg = img;
        }
        await bookService.updateBook(
            id,
            bookTitle,
            bookImg,
            bookPublic,
            bookHit,
            bookStartDate,
            bookEndDate,
            res)
        return res;
    },
    deleteBook : async (req, res) =>{
        const { id } = req.params;
        await bookService.deleteBook(id, res);

        return res;
    }
}