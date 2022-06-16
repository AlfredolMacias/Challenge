const dbConfig = require("../config/db.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./users")(sequelize, Sequelize);
db.posts = require("./posts")(sequelize, Sequelize);
db.comments = require("./comments")(sequelize, Sequelize);
db.logs = require('./logs')(sequelize, Sequelize);

db.users.hasMany(db.posts, {
  as: "posts",
  onDelete: 'CASCADE',
  hooks: true
});
db.posts.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user"
});

db.users.hasMany(db.comments,{ 
  as: "comments",
  onDelete: 'CASCADE',
  hooks: true
});
db.comments.belongsTo( db.users, {
  foreignKey: "userId",
  as: "user"
});

db.posts.hasMany(db.comments,{ 
  as: "comments",
  onDelete: 'CASCADE',
  hooks: true
});
db.comments.belongsTo( db.posts, {
  foreignKey: "postId",
  as: "post",
});

db.comments.hasMany(db.comments,{ 
  as: "comments",
  onDelete: 'CASCADE',
  hooks: true
});
db.comments.belongsTo( db.comments, {
  foreignKey: "commentId",
  as: "comment",
});




module.exports = db;