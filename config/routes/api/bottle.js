const express = require("express");
const router = express.Router();

//@route    GET api/bottle/code/code
//@desc     Get bottle from code
//access    Public

router.get("/", (req, res) => res.send("Bottle route"));

module.exports = router;
