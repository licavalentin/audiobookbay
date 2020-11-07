const search = require("./utils/search");
const getAudiobook = require("./utils/getAudiobook");
const { category, tag } = require("./utils/explore");

module.exports = {
  search: (query, page = 1) => {
    return search(query, page);
  },
  audiobook: (audiobook) => {
    return getAudiobook(audiobook);
  },
  explore: (type, explore, page = 1) => {
    switch (type) {
      case "category":
        return category(explore, page);

      case "tag":
        return tag(explore, page);

      default:
        return category(explore, page);
    }

    return new Promise((resolve) => {
      resolve({
        success: false,
        message: "You can explore only by category and tag",
      });
    });
  },
};
