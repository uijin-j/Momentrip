const Sequelize = require('sequelize');

module.exports = class TourStyle extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            tour_style: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            paranoid: false,
            underscored: false,
            modelName: 'TourStyle',
            tableName: 'tourStyle',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.TourStyle.belongsToMany(db.Book,{ through: 'BookTourStyle' });
    }
};
