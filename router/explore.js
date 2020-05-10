const express = require("express");
const router = express.Router();

const { category, tag } = require("../controller/explore");

router.get("/category/:category/:page", category);
router.get("/tag/:tag/:page", tag);

module.exports = router;
