const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("config");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator/check");

//@route GET api/profile/me
//@access private
//@desc   Test route
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      res.status(400).json({ msg: "There is no profile." });
    } else {
      res.json(profile);
    }
  } catch (err) {
    console.error(err.message);
    //res.status(500).send("Server Error.");
  }
});

//@route POST api/profile/
//@access private
//@desc   Create or update a profile

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required. ")
        .not()
        .isEmpty(),
      check("skills", "Skills are required.")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    //build profile object.
    const profileFields = {};

    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    //build social object.
    profileFields.social = {};
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (youtube) profileFields.social.youtube = youtube;
    if (linkedin) profileFields.social.linkedin = linkedin;
    //res.send("inside profile.");

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          {
            $set: profileFields
          },
          { new: true }
        );

        return res.json(profile);
      }

      //create a profile.

      profile = new Profile(profileFields);

      await profile.save();

      return res.status(200).json(profile);
    } catch (err) {
      console.error(err.message);
    }
  }
);

//@route GET api/profile/
//@access public
//@desc   Get all profiles.

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    console.log("================all profiles===========", profiles);
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error.");
  }
});

//@route GET api/profile/user/:user_id
//@access public
//@desc   Get profile by userid.

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("test.user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this." });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error.");
  }
});

//@route PUT api/profile/experience
//@access Private
//@desc   Add profile exp.

router.put("/experience", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, company, location, from, to, current, description } = req.body;
  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(400).json({ errors: errors.array() });
  }
});

//@route DELETE api/profile/
//@access private
//@desc   delete profile,user and posts.

router.delete("/", auth, async (req, res) => {
  try {
    //delete profile
    //await Profile.findOneAndRemove({ user: req.user.id });

    //delete user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "user deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).send("server error.");
  }
});

//@route GET api/profile/github/:username
//@access public
//@desc   get github repos of the user.

router.get("/github/:username", (req, res) => {
  try {
    //console.log({ $username });
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientID"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error.message);

      if (response.statusCode !== 200) {
        res.status(404).json({ msg: "No github profile found." });
      }

      return res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error.");
  }
});

module.exports = router;
