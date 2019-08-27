const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

//@route POST api/posts
//@access private
//@desc   create a new post
router.post("/", auth, async (req, res) => {
  //res.send("inside posts router ");

  const user = await User.findById(req.user.id).select("-password");
  try {
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    const post = await newPost.save();
    res.send(post);
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
});

//@route GET api/posts
//@access private
//@desc   get all posts
router.get("/", auth, async (req, res) => {
  //res.send("inside posts router ");

  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
});

//@route GET api/posts/:id
//@access private
//@desc   get post by id
router.get("/:id", auth, async (req, res) => {
  //res.send("inside posts router ");

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json("Post not found  ");
    }

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
});

//@route PUT api/posts/like/:id
//@access private
//@desc   Like a post
router.put("/like/:id", auth, async (req, res) => {
  //res.send("inside posts router ");

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json("Post not found  ");
    }

    //check if the post is already liked

    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked." });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
});

module.exports = router;
