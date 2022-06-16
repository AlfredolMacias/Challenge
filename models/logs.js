module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define("log", {
      userId: {
        type: DataTypes.INTEGER
      },
      action: {
        type: DataTypes.STRING
      },
      commentId: {
        type: DataTypes.INTEGER
      },
      postId: {
        type: DataTypes.INTEGER
      },
    });
    return Log;
  };