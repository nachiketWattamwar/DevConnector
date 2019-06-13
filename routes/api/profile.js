const express = require("express");
const router = express.Router();

//@route GET api/profile
//@access public
//@desc   Test route
router.get("/", (req, res) => {
  res.send("inside profile router ");
});

module.exports = router;
