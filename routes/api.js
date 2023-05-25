const express = require("express");
const router = express.Router();

/* index route*/
router.get("/", function (req, res, next) {
  res.send("This is api route");
});

module.exports = router;
