const Sequelize = require('sequelize');

module.exports = class Book extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            book_title: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            book_img: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            book_public: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
            },
            book_hit: {
                type: Sequelize.INTEGER,
                defaultValue : 0,
            },
            trip_start_date: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            trip_end_date: {
                type: Sequelize.DATE,
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: true,
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
        db.Book.belongsTo(db.Category);
        db.Book.belongsTo(db.TourRegion);
        db.Book.belongsToMany(db.TourStyle,{ through: 'BookTourStyle' });
    }
};
