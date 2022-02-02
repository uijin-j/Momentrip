const categoryService = require('../service/categoryService');

module.exports = {
    registerCategory : async (req, res) =>{
        const {
            category_value,
            UserId,
        } = req.body;
        await categoryService.registerCategory(category_value, UserId, res);
        return res;
    },
    // findCategoryByCategoryId : async (req, res) =>{categoryService},
    findCategoryByUserId : async (req, res) =>{
        const {user_id} = req.params;
        await categoryService.findCategoryByUserId(user_id, res);
        return res;
    },
    updateCategory : async (req, res) =>{
        const {
            category_value,
        } = req.body;
        const {id} = req.params;
        await categoryService.updateCategory(id, category_value, res);
        return res;
    },
    deleteCategory : async (req, res) =>{
        const {id} = req.params;
        await categoryService.deleteCategory(id, res);
        return res;
    }
}