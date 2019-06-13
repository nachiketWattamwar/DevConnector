const express = require("express");
const router = express.Router();

//@route GET api/user
//@access public
//@desc   Test route
router.get("/", (req, res) => {
  res.send("inside user router ");
});

module.exports = router;
