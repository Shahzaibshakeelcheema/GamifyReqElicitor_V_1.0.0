const express = require("express");
const router = express();
const User = require("../Models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
var fetchuser=require('../middleware/fetchuser');
const { success } = require("concurrently/src/defaults");
const JWT_SERECT = "Hellothisiswebsecret";

// ROUTE :01 create user by adding user into database

router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry a user with this email is already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.fname + req.body.lname,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = JWT.sign(data, JWT_SERECT);
      console.log({ authtoken });
      success=true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
    //.then(user=>res.json(user));
  }
);

// ROUTE :02  Creating  authenticate a user using login

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").exists(),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false;
        return res.status(400).json({ error: "Please enter valid not find " });
      }
      const passwordcampare = await bcrypt.compare(password, user.password);
      if (!passwordcampare) {
        success=false;
        return res.status(400).json({success, error: "Please enter valid password " });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = JWT.sign(data, JWT_SERECT);
      success=true;
      console.log({ authtoken });
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);

// ROUTE :03 Get logged in user detail using POST "api/auth/getuser". Login required
router.post(
  "/getuser", fetchuser,
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").exists(),
  ],
  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);


// Route : 03

module.exports = router;
