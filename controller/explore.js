// Fetch Results
const fetchAudiobookResults = require("../utils/fetchAudiobookResults");

// @desc       Get Audiobooks by Category
// @route      GET /explore/category/:category/:page
// @access     Public
exports.category = async (req, res, next) => {
  const data = [];
  const paggination = {};
  let notFound = { success: true };

  const url = `http://audiobookbay.nl/audio-books/type/${req.params.category}/${
    req.params.page != 1 ? "page/" + req.params.page + "/" : ""
  }`;

  // Fetch Data
  await fetchAudiobookResults(url, data, paggination, notFound);

  if (!notFound.success) {
    return next({
      statusCode: 404,
      query: `No Audiobook with Category of ${req.params.category} Exist's`,
    });
  }

  res.status(200).json({
    success: true,
    paggination: paggination,
    data: data,
  });
};

// @desc       Get Audiobooks by Tag
// @route      GET /explore/tag/:tag/:page
// @access     Public
exports.tag = async (req, res, next) => {
  const data = [];
  const paggination = {};
  let notFound = { success: true };

  const url = `http://audiobookbay.nl/audio-books/tag/${req.params.tag}/${
    req.params.page != 1 ? "page/" + req.params.page + "/" : ""
  }`;

  // Fetch Data
  await fetchAudiobookResults(url, data, paggination, notFound);

  if (!notFound.success) {
    return next({
      statusCode: 404,
      query: `No Audiobook with Category of ${req.params.tag} Exist's`,
    });
  }

  res.status(200).json({
    success: true,
    paggination: paggination,
    data: data,
  });
};
