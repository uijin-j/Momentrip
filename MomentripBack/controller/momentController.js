const momentService = require('../service/momentService');
const hashtagService = require('../service/hashtagService');
module.exports = {
    registerMoment : async (req,res) => {
        const momentImg = req.file.key;
        const {
            momentTitle,
            momentContent,
            momentPublic,
            BookId
        } = req.body;
        await momentService.register(
            momentTitle,
            momentContent,
            momentImg,
            momentPublic,
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
    findUserIndividualMoment : async (req, res)=> {
        const {user_id} = req.params;
        await momentService.findUserIndividualMoment(user_id, res);
        return res;
    },
    findMomentByBook : async (req,res) => {
        const { book_id } = req.params;
        await momentService.findMomentByBook(book_id,res);
        return res;
    },
    searchMoment : async (req, res) => {
        const {keyword} = req.body;
        await momentService.searchMoment(keyword, res);
        return res;
    },
    updateMomentById : async (req,res) => {
        const { id } = req.params;
        const momentImg = req.file.key;
        const {
            momentTitle,
            momentContent,
            momentPublic,
        } = req.body;
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















