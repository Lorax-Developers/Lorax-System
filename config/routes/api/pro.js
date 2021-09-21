const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const User = require("../models/User");
var mongoose = require("mongoose");

//@route    GET api/pro
//@desc     Gets manufacturers
//access    Public
router.get("/", auth, async (req, res) => {
  try {
    User.find({ role: "Manufacturer" })
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

//@route    GET api/pro
//@desc     Gets PRO Manufacturers
//access    Public
router.get("/manufacturers/:id", auth, async (req, res) => {
  try {
    const myID = req.params.id;
    User.findById(myID)
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

//@route    POST api/pro
//@desc     Request Manufacturer for PRO
//access    Public
router.post("/request/:id/:mId", auth, async (req, res) => {
  console.log("In express function");
  try {
    if (!req.body) {
      return res
        .status(400)
        .send({ message: "Can not update user, user doesnt exist" });
    }

    const manID = req.params.mId;
    const myID = req.params.id;
    User.findOneAndUpdate(
      { _id: myID },
      {
        $set: {
          pro: {
            id: manID,
            status: "Requested",
          },
        },
      },
      {
        returnOriginal: false,
      }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "User not found" });
        } else {
          res.send({ message: "User has been requested" });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Cannot request user" });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/pro
//@desc     Delete manufacturer from PRO array of PRO user
//access    Public
router.delete("/remove/:id/:mId", auth, async (req, res) => {
  console.log("In express function");
  try {
    if (!req.body) {
      return res
        .status(400)
        .send({ message: "Can not update user, user doesnt exist" });
    }

    const manID = req.params.mId;
    const myID = req.params.id;
    User.findOneAndUpdate(
      { _id: myID },
      {
        $unset: {
          pro: {
            id: manID,
          },
        },
      }
    ).then((data) => {
      if (!data) {
        res.status(404).send({ message: "Cannot find user" });
      } else {
        res.send({ message: "User was deleted successfully" });
      }
    });
  } catch {
    res.status(500).send({ message: "Could not delete user" });
  }
});

module.exports = router;
