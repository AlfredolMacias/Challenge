const post = require('../controllers/post_controller');
const user = require('../controllers/user_controller');
const comment = require('../controllers/comment_controller');
const checkRoleAuth = require('../middleware/roleAuth');
const checkAuth = require("../middleware/auth");
const { findAllLogs } = require('../controllers/log_controller');


let router = require("express").Router();


router.post("/post", checkAuth, checkRoleAuth(['CrearEliminarPosts', 'admin']), post.createPost);
router.get('/', post.findAllPost);
router.get('/post/:id', post.findOnePost);
router.put('/post/:id', checkAuth, checkRoleAuth(['ActualizarPosts', 'admin']),post.updatePost);
router.delete('/post/:id',checkAuth, checkRoleAuth(['CrearEliminarPosts', 'admin']), post.deletePost);


router.post("/login", user.login);
router.post("/user", checkAuth, checkRoleAuth(['admin']), user.createUser);
router.get('/users', checkAuth, checkRoleAuth(['admin']),user.findAllUser);
router.put('/user/:id',checkAuth, checkRoleAuth(['admin']),  user.updateUser);
router.delete('/user/:id',checkAuth, checkRoleAuth(['admin']), user.deleteUser);


router.post("/comment", comment.createComment);
router.get('/comment/:id', comment.findOneComment);
router.put('/comment/:id', checkAuth, checkRoleAuth(['EliminarComentarios']), comment.updateComment);
router.delete('/comment/:id', checkAuth, checkRoleAuth(['EliminarComentarios']), comment.deleteComment);

router.get("/logs", checkAuth, checkRoleAuth(['admin']), findAllLogs);

module.exports = router;