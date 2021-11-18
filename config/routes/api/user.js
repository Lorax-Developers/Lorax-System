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
    check("phone", "Please include a valid phone number").not().isEmpty(),
    check(
      "password",
      "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long"
    ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
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
    const { name, email, phone, password, role, city, province, access } =
      req.body;

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
        phone,
        password,
        role,
        city,
        province,
        access,
      });

      //hash password
      //salt to hash
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      //save user to db
      await user.save();

      //JWT
      const payload = {
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
          role: user.role,
          access: user.access,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    POST api/user/update
//@desc     Update the user
//access    Public (eg token needed?)
router.post(
  "/update",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("phone", "Phone is required").not().isEmpty(),
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
    const { name, email, phone, city, province, currentEmail } = req.body;

    try {
      //check if user exists
      let user = await User.findOne({ email: currentEmail });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "User doesnt exist" }] });
      }

      //create instance of user
      user = new User({
        name,
        email,
        phone,
        city,
        province,
      });

      var myquery = { email: currentEmail };
      var newvalues = {
        $set: {
          name: name,
          email: email,
          phone: phone,
          province: province,
          city: city,
        },
      };

      try {
        await User.updateOne(myquery, newvalues);
      } catch (err) {
        console.log(err);
      }

      /*
      connectDB.inventory.updateOne(
      { email: CurrentEmail }, // specifies the document to update
      {
        $set: {
          name: { name },
          email: { email },
          province: { province },
          city: { city },
        },
        $currentDate: { lastModified: true },
      }
    );
      */

      //JWT
      const payload = {
        user: {
          id: user.id,
          name: user.name,
          role: user.role,
          access: user.access,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Get list of manufacturers
//@route    POST api/User/manufacturerlist

router.get("/manufacturerlist", async (req, res) => {
  User.find({ role: "Manufacturer" }, (err, User) => {
    if (err) {
      res.send(err);
    }
    res.json(User);
  });
});

router.get("/userdetails/:id", function (req, res, next) {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).end();
      }
      let myId = user._id;
      let myName = user.name;
      let myCity = user.city;
      let myEmail = user.email;
      let myPhone = user.phone;
      let myProvince = user.province;
      let myRole = user.role;
      return res.status(200).json({
        statusType: "User details",
        myId,
        myName,
        myRole,
        myEmail,
        myPhone,
        myCity,
        myProvince,
        status: 200,
      });
    })
    .catch((err) => next(err));
});

// Get number of registered users
//@route    GET api/user/userCount
router.get("/userCount", async (req, res) => {
  let ManufacturerCount = await User.countDocuments({ role: "Manufacturer" });
  let RetailerCount = await User.countDocuments({ role: "Retailer" });
  let ConsumerCount = await User.countDocuments({ role: "Consumer" });
  let WastePickerCount = await User.countDocuments({ role: "Waste Picker" });
  let RecyclingDepotCount = await User.countDocuments({
    role: "Recycling Depot",
  });
  let ProCount = await User.countDocuments({ role: "PRO" });

  const provinces = [
    "Eastern Cape",
    "Free State",
    "Gauteng",
    "KwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "Northern Cape",
    "North West",
    "Western Cape",
  ]; // 9 provinces
  const manufacturerArray = [];
  const retailerArray = [];
  const consumerArray = [];
  const wastepickerArray = [];
  const recyclingdepotArray = [];
  const proArray = [];

  for (let i = 0; i < 9; i++) {
    let count = await User.countDocuments({
      role: "Manufacturer",
      province: provinces[i],
    });
    manufacturerArray.push(count);
  }
  for (let i = 0; i < 9; i++) {
    let count = await User.countDocuments({
      role: "Retailer",
      province: provinces[i],
    });
    retailerArray.push(count);
  }
  for (let i = 0; i < 9; i++) {
    let count = await User.countDocuments({
      role: "Consumer",
      province: provinces[i],
    });
    consumerArray.push(count);
  }
  for (let i = 0; i < 9; i++) {
    let count = await User.countDocuments({
      role: "Waste Picker",
      province: provinces[i],
    });
    wastepickerArray.push(count);
  }
  for (let i = 0; i < 9; i++) {
    let count = await User.countDocuments({
      role: "Recycling Depot",
      province: provinces[i],
    });
    recyclingdepotArray.push(count);
  }
  for (let i = 0; i < 9; i++) {
    let count = await User.countDocuments({
      role: "PRO",
      province: provinces[i],
    });
    proArray.push(count);
  }

  res.status(200).json({
    statusType: "Number of Registered Users",
    ManufacturerCount,
    RetailerCount,
    ConsumerCount,
    WastePickerCount,
    RecyclingDepotCount,
    ProCount,
    provinces,
    manufacturerArray,
    retailerArray,
    consumerArray,
    wastepickerArray,
    recyclingdepotArray,
    proArray,
    status: 200,
  });
});

router.get("/usersByProvince", async (req, res) => {
  const provinces = [
    "Eastern Cape",
    "Free State",
    "Gauteng",
    "KwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "Northern Cape",
    "North West",
    "Western Cape",
  ]; // 9 provinces
  const manufacturerArray = [];
  const retailerArray = [];
  const consumerArray = [];
  const wastepickerArray = [];
  const recyclingdepotArray = [];
  const proArray = [];

  for (let i = 0; i < 9; i++) {
    let count = await User.countDocuments({
      role: "Manufacturer",
      province: provinces[i],
    });
    manufacturerArray.push(count);
  }
  for (let i = 0; i < 9; i++) {
    let count = await User.countDocuments({
      role: "Retailer",
      province: provinces[i],
    });
    retailerArray.push(count);
  }
  for (let i = 0; i < 9; i++) {
    let count = await User.countDocuments({
      role: "Consumer",
      province: provinces[i],
    });
    consumerArray.push(count);
  }
  for (let i = 0; i < 9; i++) {
    let count = await User.countDocuments({
      role: "Waste Picker",
      province: provinces[i],
    });
    wastepickerArray.push(count);
  }
  for (let i = 0; i < 9; i++) {
    let count = await User.countDocuments({
      role: "Recycling Depot",
      province: provinces[i],
    });
    recyclingdepotArray.push(count);
  }
  for (let i = 0; i < 9; i++) {
    let count = await User.countDocuments({
      role: "PRO",
      province: provinces[i],
    });
    proArray.push(count);
  }

  res.status(200).json({
    statusType: "Number of Registered Users",
    provinces,
    manufacturerArray,
    retailerArray,
    consumerArray,
    wastepickerArray,
    recyclingdepotArray,
    proArray,
    status: 200,
  });
});

module.exports = router;
