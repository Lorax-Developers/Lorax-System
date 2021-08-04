const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

//@route    POST api/User
//@desc     register user
//access    Public (eg token needed?)
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("role", "Role is required").not().isEmpty(),

    //the enforcement is preventing sign up but there isn't any space to enter the info on front end
    check("city", "City is required").not().isEmpty(),
    check("province", "Province is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //bad request
      return res.status(400).json({ errors: errors.array() });
    }
    //pull data from request
    const { name, email, password, role, city, province, access } = req.body;

    try {
      //check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      //create instance of user
      user = new User({
        name,
        email,
        password,
        role,
        city,
        province,
        access,
      });

      //encrypt password
      //salt to hash
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      //save user to db
      await user.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
