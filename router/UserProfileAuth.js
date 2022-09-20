const express = require("express");
const router = express.Router();
require("../DB/conn");
const User = require("../Model/userShema");
const authenticate = require("../Middleware/Authenticate");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const tweetlist = require("../Model/tweetShema");

router.get("/userProfile/:username", authenticate, async (req, res) => {
  const userpro = await User.findOne({ username: req.params.username });
  if (userpro) {
    try {
      return res.json({ user: userpro });
    } catch (err) {
      console.log(err);
    }
  }
});

router.get("/userprofiletweets", authenticate, async (req, res) => {
  try {
    const listOne = await tweetlist.find();

    if (listOne) {
      return res.json(listOne);
    } else console.log(Error);
  } catch (err) {
    console.log(err);
  }
});

router.post("/updateprofileDetails", authenticate, async (req, res) => {
  const { name, bio, location } = req.body;
  const listOne = await User.find({ username: req.rootUser.username });
  if (listOne) {
    try {
      const userNew = await User.findOneAndUpdate(
        { username: req.rootUser.username },
        {
          name: name,
          Bio: bio,
          Location: location,
        }
      );

      const userNeww = await tweetlist.updateMany(
        { username: req.rootUser.username },
        {
          name: name,
        }
      );

      res.status(210).json({ message: "Registration Success" });
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("notfound");
  }
});

router.post("/updateprofileinitial", async (req, res) => {
  const { bio, location, username } = req.body;
  const listOne = await User.find({ username: username });
  if (listOne) {
    try {
      const userNew = await User.findOneAndUpdate(
        { username: username },
        {
          Bio: bio,
          Location: location,
        }
      );

      res.status(210).json({ message: "Registration Success" });
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("notfound");
  }
});

module.exports = router;
