const Sequelize = require('sequelize');

module.exports = class TourRegion extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            tour_region: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            paranoid: false,
            underscored: false,
            modelName: 'TourRegion',
            tableName: 'tourRegion',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.TourRegion.hasMany(db.Book);
    }
};
