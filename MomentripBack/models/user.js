const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            nick: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            profile_img: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            provider: {
                type: Sequelize.STRING(10),
                allowNull: true,
                defaultValue: 'local',
            },
        }, {
            sequelize,
            timestamps: true,       //createdTime, updatedTime
            paranoid: true,         //deletedTime
            underscored: false,
            modelName: 'User',
            tableName: 'user',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Moment);
        db.User.hasMany(db.Book);

        db.User.belongsToMany(db.User, {
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow',
        });
        db.User.belongsToMany(db.User, {
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow',
        });
    }
};
