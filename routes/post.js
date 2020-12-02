const express = require("express");
const { isAuthenticated, isSignedIn, isAdmin } = require("../controllers/auth");
const router = express.Router();
const {
  createPost,
  getAllPost,
  getMyPosts,
  getLike,
  getUnLike,
  getComment,
  getPostById,
  removePost,
  getUserAndPost,
  UserAndPost,
} = require("../controllers/post");
const { getUserById } = require("../controllers/user");

//PARAMS
router.param("userId", getUserById);
router.param("postId", getPostById);
router.param("userAndPost", UserAndPost);

//Create Post
router.post("/createpost/:userId", isSignedIn, isAuthenticated, createPost);

//Get only user's Posts.
router.get("/myposts/:userId", isSignedIn, isAuthenticated, getMyPosts);

//All the posts
//TODO: Add isAdmin
router.get("/posts/:userId", isSignedIn, isAuthenticated, getAllPost);

//Like Route
router.put("/like/:userId", isSignedIn, isAuthenticated, getLike);

//UnLike Route
router.put("/unlike/:userId", isSignedIn, isAuthenticated, getUnLike);

//Comment Route
router.put("/comment/:userId", isSignedIn, isAuthenticated, getComment);

//Delete Post
router.delete(
  "/delete/:userId/:postId",
  isSignedIn,
  isAuthenticated,
  removePost
);

//Get User and it's Posts.
router.get(
  "/user/:userId/:userAndPost",
  isSignedIn,
  isAuthenticated,
  getUserAndPost
);

module.exports = router;
