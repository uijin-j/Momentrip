const Sequelize = require('sequelize');

module.exports = class Book extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            book_img: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            book_title: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            book_public: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            book_hit: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
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
