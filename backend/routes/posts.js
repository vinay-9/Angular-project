const express = require("express");

const PostController = require("../controllers/posts");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, PostController.createPost);
// check auth is a middle ware

// USED FOR VERIFICATION OF THE USER WHETHER HE IS THE VALID O=PERSON TO EXTRACT THE FILE

router.put("/:id", checkAuth, extractFile, PostController.updatePost);
// TO RETURN TH POSTS
// it will return even if the person is nor authenticated 
router.get("", PostController.getPosts);
// TO RETURN THE POST
router.get("/:id", PostController.getPost);
// TO VERUFY THAT WHTHEER THE PERSON IS THE ACTUAL AITHOR TO DELETE THE POST
router.delete("/:id", checkAuth, PostController.deletePost);

// EXPORT THE  ROUTER
module.exports = router;
//NOW MOVE TO THE CONTROLLERS
