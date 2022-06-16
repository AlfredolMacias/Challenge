const { schemaCreatePost } = require("../helpers/validator");
const db = require("../models");
const log = require("./log_controller");

const Post = db.posts;

const createPost = (req, res) => {
    // Validate request
    const { error } = schemaCreatePost.validate(req.body);
    if( error ){
      return res.status(400).json(
        {error: error.details[0].message}
      )
    }
    // Create a post
    const post = {
      body_post: req.body.body_post,
      userId: req.body.userId,
    };
    // Save Post in the database
    Post.create(post)
      .then(data => {
        res.send(data);
        log.createLog(1, "created",data.id, null  );
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Post."
        });
      });
  };
    // Retrieve all Posts from the database.
    findAllPost = (req, res) => {
        Post.findAll()
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving Posts."
            });
        });
    };
    // Find a single Post with an id
    findOnePost = (req, res) => {
    
    };
    // Update a Post by the id in the request
    updatePost = (req, res) => {
        const id = req.params.id;
        Post.update(req.body, {
            where: { id: id }
        })
            .then(num => {
            if (num == 1) {
                res.send({
                message: "Post was updated successfully."
                });
                log.createLog(1, "Updated", id, null );
            } else {
                res.send({
                message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
                });
            }
            })
            .catch(err => {
            res.status(500).send({
                message: "Error updating Post with id=" + id
            });
        });
    };
    // Delete a Post with the specified id in the request
    deletePost = (req, res) => {
        const id = req.params.id;
        Post.destroy({
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Post was deleted successfully!"
              });
              log.createLog(1, "deleted", id, null );
            } else {
              res.send({
                message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Post with id=" + id
            });
          });
    };
 

module.exports = {
    createPost,
    findAllPost, 
    findOnePost, 
    updatePost,
    deletePost
}

