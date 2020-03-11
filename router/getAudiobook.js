const express = require("express");
const router = express.Router();

const { getAudiobook } = require("../controller/getAudiobook");

router.get("/:audiobook", getAudiobook);

module.exports = router;
