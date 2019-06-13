const express = require("express");
const router = express.Router();

//@route GET api/auth
//@access public
//@desc   Test route
router.get("/", (req, res) => {
  res.send("inside auth router ");
});

module.exports = router;
