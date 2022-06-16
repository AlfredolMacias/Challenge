const db = require("../models");
const Log = db.logs;

const createLog = (user, action, postId, commentId) => {
  const log = {
              userId: user,
              action: action,
              postId: postId,
              commentId: commentId 
            }

    Log.create(log)
    .then(data => {
      return 1;
    })
    .catch(err => {
      return 0
    });
}
// Retrieve all Log from the database.
findAllLogs = (req, res) => {
  Log.findAll()
      .then(data => {
      res.send(data);
      })
      .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occurred while retrieving Log."
      });
  });
};

module.exports = {createLog, findAllLogs};