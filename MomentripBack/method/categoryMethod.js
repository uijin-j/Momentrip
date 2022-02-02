const Category = require('../models/category');
const {Op} = require("sequelize");

module.exports = {
    register : async (category_value, UserId) => {
        try{
            const category = await Category.create({
                category_value,
                UserId
            })
            return category;
        }catch (err){
            throw err;
        }
    },
    findByUserId : async (user_id) => {
        try{
            const categories = await Category.findAll({where : {UserId: user_id}})
            return categories;
        }catch (err){
            throw err;
        }
    },
    update : async (id, category_value) => {
        try{
            console.log(category_value);
            console.log(id);
            const category = await Category.update({
                category_value,
            }, {
                where : {id}
            })
            return category;
        }catch (err){
            throw err;
        }
    },
    delete : async (id) => {
        try{
            console.log(id);
            await Category.destroy({where : {id}})
        }catch (err){
            throw err;
        }
    }
}