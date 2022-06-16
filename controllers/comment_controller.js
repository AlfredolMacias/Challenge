const db = require("../models");
const log = require("./log_controller");
const { schemaUpdateComment, schemaCreateComment } = require("../helpers/validator");


const Comment = db.comments;

const createComment = (req, res) => {
    // Validate request
    const { error } = schemaCreateComment.validate(req.body);
    if( error ){
      return res.status(400).json(
        {error: error.details[0].message}
      )
    }
    // Create a Comment
    const comment = {
      body_comment: req.body.body_comment,
      userId: req.body.userId,
      postId: req.body.postId,
      commentId: req.body.commentId,
    };
    // Save User in the database
    Comment.create(comment)
      .then(data => {
        res.send(data);
        log.createLog(data.userId, "Created", null, data.id );
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Comments."
        });
      });
  };
  
  // Retrieve all Comments from the database.
   findAllComment = (req, res) => {
        Comment.findAll()
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving Commentss."
            });
        });
    };
    // Find a single Comments with an id
    findOneComment = (req, res) => {
    
    };
    // Update a Comments by the id in the request
    updateComment = (req, res) => {
      const { error } = schemaUpdateComment.validate(req.body);
      if( error ){
        return res.status(400).json(
          {error: error.details[0].message}
        )
      }
        const id = req.params.id;
        Comment.update(req.body, {
            where: { id: id }
        })
            .then(num => {
              if (num[0] === 1) {
                res.send({
                  message: "Comment was updated successfully."
                });
                log.createLog(1, "Updated", null, id );
            } else {
                res.send({
                message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`
                });
            }
            })
            .catch(err => {
            res.status(500).send({
                message: err
            });
        });
    };
    // Delete a Comments with the specified id in the request
    deleteComment = (req, res) => {
        const id = req.params.id;
        Comment.destroy({
          where: { id: id }
        })
          .then(num => {
            // console.log(num);
            if (num === 1) {
              res.send({
                message: "Comment was deleted successfully!"
              });
              log.createLog(1, "deleted", null, id );

            } else {
              res.send({
                message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Comment with id=" + id
            });
          });
    };
    

module.exports = {
    createComment,
    findAllComment,
    findOneComment,
    updateComment,
    deleteComment
}