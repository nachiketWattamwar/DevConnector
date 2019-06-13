const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
//@route GET api/auth
//@access public
//@desc   Test route
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    console.log(`info of selected user is ${user}`);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "server error." });
  }
});

module.exports = router;
