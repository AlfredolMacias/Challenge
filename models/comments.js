module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
      body_comment: {
        type: DataTypes.STRING
      },
    });
    return Comment;
  };