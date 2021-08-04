const Sequelize = require('sequelize');

module.exports = class Category extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            category_value: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            category_parent: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            paranoid: false,
            underscored: false,
            modelName: 'Category',
            tableName: 'category',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Category.belongsToMany(db.Book, {through: 'BookCategory'});
    }
};
