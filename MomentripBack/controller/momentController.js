const momentService = require('../service/momentService');

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

        await momentService.register(
            momentTitle,
            momentContent,
            momentImg,
            momentPublic,
            UserId,
            BookId,
            res);
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















