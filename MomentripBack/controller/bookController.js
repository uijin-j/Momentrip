const bookService = require('../service/bookService');
const tourStyleService = require('../service/tourStyleService');
module.exports={
    registerBook: async (req, res) => {
        const book_img = req.file.key; //이미지 하나 올리기 코드
/*
        /!* singleImage의 경우 req.file에서 파싱! *!/
        const book_img = req.files;
        /!* 이미지의 경로들을 path에 배열로 저장시킴 *!/
        const path = book_img.map(img => img.path);
        // const book_img = "Test.jpg"; //임시 코드
*/
        const {
            book_title,
            trip_start_date,
            trip_end_date,
            book_public,
            book_hit,
            CategoryId,
            tour_style,
            TourRegionId,
        } = req.body;
        await bookService.register(
            book_title,
            trip_start_date,
            trip_end_date,
            book_img,
            book_public,
            book_hit,
            CategoryId,
            TourRegionId,
            res);

        if(tour_style){//선택한 여행 스타일이 있으면
            /*await Promise.all(
                tour_style.map(tag => {
                    return tourStyleService.register({
                        tour_style: tag.split(',')
                    })
                }),
            );*/
        }
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
    searchBookByFollowingId : async (req,res) => {
        const {
            user_id,
        } = req.params;
        await bookService.findBookByFollowingId(user_id, res);

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
