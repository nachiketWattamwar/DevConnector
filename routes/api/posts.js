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

module.exports = router;
