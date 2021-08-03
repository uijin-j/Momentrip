const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            hashtag_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            hashtag_title: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            paranoid: false,
            underscored: false,
            modelName: 'hashtag',
            tableName: 'hashtag',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Hashtag.belongsToMany(db.Moment, {
            foreignKey:'hashtag_id',
            through: 'MomentHashtag' });
    }
};