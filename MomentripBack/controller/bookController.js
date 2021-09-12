const bookService = require('../service/bookService');

module.exports={
    registerBook: async (req, res) => {
        // const bookImgFile = req.file; //원래 코드
        const bookImgFile = "Test.jpg"; //임시 코드
        const {
            bookTitle,
            bookPublic,
            bookHit,
        } = req.body;
        /*console.log("req.body : " + req.body)
        console.log("req.file : " + req.file);
        console.log("bookImgFile : " + bookImgFile);
        console.log("bookTitle : " + bookTitle);*/

        await bookService.register(
            bookTitle,
            bookImgFile,
            bookPublic,
            bookHit,
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
        await bookService.findBookByUserId(user_id,res);

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
            res)
        return res;
    },
    deleteBook : async (req, res) =>{
        const { id } = req.params;
        await bookService.deleteBook(id, res);

        return res;
    }
}