const Sequelize = require('sequelize');

module.exports = class Moment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            moment_title: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            moment_content: {
                type: Sequelize.STRING(300),
                allowNull: true,
            },
            moment_img: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            moment_public: {
                type : Sequelize.BOOLEAN,
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            underscored: false,
            modelName: 'Moment',
            tableName: 'moment',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Moment.belongsTo(db.User);
        db.Moment.belongsTo(db.Book);
        db.Moment.belongsToMany(db.Hashtag, { through: 'MomentHashtag' });
    }
};
