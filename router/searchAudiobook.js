const express = require("express");
const router = express.Router();

const { searchAudiobook } = require("../controller/searchAudiobook");
router.get("/:query/:page", searchAudiobook);

module.exports = router;
