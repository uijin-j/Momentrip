const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const User = require('./user');
const Book = require('./book');
const Category = require('./category');
const Hashtag = require('./hashtag');
const Moment = require('./moment');
const TourRegion = require('./tourRegion');
const TourStyle = require('./TourStyle');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Moment = Moment;
db.Book = Book;
db.Hashtag = Hashtag;
db.Category = Category;
db.TourRegion = TourRegion;
db.TourStyle = TourStyle;

User.init(sequelize);
Moment.init(sequelize);
Book.init(sequelize);
Hashtag.init(sequelize);
Category.init(sequelize);
TourRegion.init(sequelize);
TourStyle.init(sequelize);

User.associate(db);
Moment.associate(db);
Book.associate(db);
Hashtag.associate(db);
Category.associate(db);
TourRegion.associate(db);
TourStyle.associate(db);

module.exports = db;
