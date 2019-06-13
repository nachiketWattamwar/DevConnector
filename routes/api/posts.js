const express = require("express");
const router = express.Router();

//@route GET api/posts
//@access public
//@desc   Test route
router.get("/", (req, res) => {
  res.send("inside posts router ");
});

module.exports = router;
