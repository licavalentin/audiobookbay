// Fetch Results
const fetchAudiobookResults = require("../utils/fetchAudiobookResults");

exports.searchAudiobook = async (req, res, next) => {
  const data = [];
  const paggination = {};
  let notFound = { success: true };

  // Search Url
  const url = `http://audiobookbay.nl/page/${
    req.params.page
  }/?s=${req.params.query.toLowerCase()}`;

  // Fetch Data
  await fetchAudiobookResults(url, data, paggination, notFound);

  if (!notFound.success) {
    return next({
      statusCode: 404,
      query: `No Audiobook with Title of ${req.params.query} Exist's`,
    });
  }

  res.status(200).json({
    success: true,
    paggination: paggination,
    data: data,
  });
};
