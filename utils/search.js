const fetchAudiobookResults = require("./fetchAudiobookResults");

// Search Audiobooks by Query
module.exports = async (query, page) => {
  // Search Url
  const url = `http://audiobookbay.nl/page/${page}/?s=${query.toLowerCase()}`;

  // Fetch Data
  return await fetchAudiobookResults(url, query);
};
