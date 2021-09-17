const Sequelize = require('sequelize');

module.exports = class Book extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
        }, {
            sequelize,
            timestamps: false,
            paranoid: false,
            underscored: false,
            modelName: 'Book',
            tableName: 'book',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Book.hasMany(db.Moment);
        db.Book.belongsTo(db.User);
        db.Book.belongsToMany(db.Category, { through: 'BookCategory' });
    }
};
