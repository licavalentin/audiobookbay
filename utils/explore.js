// Fetch Results
const fetchAudiobookResults = require("./fetchAudiobookResults");

// @desc       Get Audiobooks by Category
exports.category = async (category, page) => {
  const url = `http://audiobookbay.nl/audio-books/type/${category}/${
    page != 1 ? "page/" + page + "/" : ""
  }`;

  // Fetch Data
  return await fetchAudiobookResults(url);
};

// @desc       Get Audiobooks by Tag
exports.tag = async (tag, page) => {
  const url = `http://audiobookbay.nl/audio-books/tag/${tag}/${
    page != 1 ? "page/" + page + "/" : ""
  }`;

  // Fetch Data
  return await fetchAudiobookResults(url);
};
