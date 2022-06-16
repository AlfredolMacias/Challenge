const Joi = require('@hapi/joi');


const schemaRegister = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    lastname: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(3).max(1024).required(),
    role: Joi.string().min(5).max(255).required()
});


const schemaUpdateUser = Joi.object({
    name: Joi.string().min(3).max(255),
    lastname: Joi.string().min(3).max(255),
    email: Joi.string().min(6).max(255).email(),
    password: Joi.string().min(3).max(1024),
    role: Joi.string().min(5).max(255)
});

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(3).max(1024).required(),
})


const schemaCreateComment = Joi.object({
    body_comment: Joi.string().min(3).max(255).required(),
    postId: Joi.number().required(),
    commentId: Joi.number()
});
const schemaUpdateComment = Joi.object({
    body_comment: Joi.string().min(3).max(255).required(),
});

const schemaCreatePost = Joi.object({
    body_post: Joi.string().min(3).max(255).required(),
    userId: Joi.number().required(),
});

const schemaUpdatePost = Joi.object({
    body_post: Joi.string().min(3).max(255)
});

module.exports = {
    schemaRegister,
    schemaLogin,
    schemaCreateComment,
    schemaCreatePost,
    schemaUpdateUser,
    schemaUpdatePost,
    schemaUpdateComment
}