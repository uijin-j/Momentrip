const momentService = require('../service/momentService');
const hashtagService = require('../service/hashtagService');
module.exports = {
    registerMoment : async (req,res) => {
        // const momentImg = req.file;
        const momentImg = "MomentTest.jpg";
        const {
            momentTitle,
            momentContent,
            momentPublic,
            UserId,
            BookId
        } = req.body;

        const moment = await momentService.register(
            momentTitle,
            momentContent,
            momentImg,
            momentPublic,
            UserId,
            BookId,
            res);

        const hashtags = req.body.momentContent.match(/#[^s#]*/g); // 해시태그 추출
        if(hashtags){ //해시태그가 있으면
            const result = await Promise.all(
                hashtags.map(tag => {
                     return hashtagService.register({ // 해시태그 생성
                        hashtag_title:tag.slice(1).toLowerCase(), // 앞에 # 떼고 소문자로 변환
                    })
                }),
            );
            //await moment.addHashtags(result.map(r=>r[0]));
        }
        return res;
    },
    findAllMoment : async (req,res) => {
        await momentService.findAll(res);

        return res;
    },
    findMomentById : async (req,res) => {
        const {id} = req.params;
        await momentService.findMomentById(id,res);
        return res;
    },
    findMomentByUserId : async (req, res)=> {
        const {user_id} = req.params;
        await momentService.findMomentByUserId(user_id, res);
        return res;
    },
    findAllMomentByOneBook : async (req,res) => {
        const { book_id } = req.params;
        await momentService.findByOneBook(book_id,res);

        return res;
    },
    updateMomentById : async (req,res) => {
        const {
            id
        } = req.params;
        // let momentImg = req.files;
        let momentImg = "update.img";
        const {
            momentTitle,
            momentContent,
            defaultImg,
            momentPublic,
        } = req.body;
        if(!momentImg){
            momentImg = defaultImg;
        }
        await momentService.updateMoment(
            id,
            momentTitle,
            momentContent,
            momentImg,
            momentPublic,
            res);
        return res;
    },
    deleteMomentById : async (req,res) => {
        const {
            id
        } = req.params;
        await momentService.deleteMoment(id,res);

        return res;
    }
}















