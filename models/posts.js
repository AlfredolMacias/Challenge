module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("post", {
      body_post: {
        type: DataTypes.STRING
      },
    });
    return Post;
  };