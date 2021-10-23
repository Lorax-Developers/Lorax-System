const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const User = require("../models/User");
var mongoose = require("mongoose");

//@route    GET api/admin
//@desc     Gets user details of users without access
//access    Public
router.get("/", auth, async (req, res) => {
  try {
    User.find({ access: "Pending" })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occured while retrieving user information",
        });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/admin
//@desc     Grants user access
//access    Public
router.put("/update/:id", auth, async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .send({ message: "Can not update user, user doesnt exist" });
    }
    const id = req.params.id;
    User.findByIdAndUpdate(id, { access: "granted" })
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "User not found" });
        } else {
          res.send({ message: "User has been granted access" });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Cannot update user" });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/admin
//@desc     Denies user access
//access    Public
router.delete("/remove/:id", auth, async (req, res) => {
  await User.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Cannot find user" });
      } else {
        res.send({ message: "User was deleted successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Could not delete user" });
    });
});

//@route    GET api/admin
//@desc     Gets PRO users with requested manfuacturers
//access    Public
router.get("/pro", auth, async (req, res) => {
  try {
    User.find({ "pro.status": "Requested" })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occured while retrieving user information",
        });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    PUT api/admin
//@desc     Grants PRO Access to manufacturer
//access    Public
router.put("/pro/update/:id", auth, async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .send({ message: "Can not update user, user doesnt exist" });
    }
    const id = req.params.id;
    User.findByIdAndUpdate(id, { "pro.status": "granted" })
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "User not found" });
        } else {
          res.send({ message: "User has been granted PRO access" });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Cannot update user" });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
