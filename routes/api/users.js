const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const { check, validationResult } = require("express-validator/check");

//@route POST api/user
//@access public
//@desc   Register User
router.post(
  "/",
  [
    check("name", "Name is required ")
      .not()
      .isEmpty(),
    check("email", "Please include valid email address")
      .isEmail()
      .normalizeEmail(),
    check("password", "Please enter a proper password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = res.body;

    try {
      // check if user exists

      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists." }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      res.send("inside user router ");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
