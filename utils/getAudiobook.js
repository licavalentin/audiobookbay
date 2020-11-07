const cheerio = require("cheerio");
const axios = require("axios");

module.exports = async (audiobook) => {
  // AudioBook URL
  // Some Url have characters not recognised by axios encodeURI
  const url = encodeURI(`http://audiobookbay.nl/audio-books/${audiobook}/`);

  try {
    // Fetch AudioBook
    const AudioBook = await axios.get(url);

    // Load HTML with Cheerio
    const $ = cheerio.load(AudioBook.data);

    // AudioBook Title
    const title = $(".postTitle h1").text();

    // AudioBook Category
    const category = [];
    $(".postInfo a").each((index, el) => {
      if ($(el).attr("rel") === "category tag") {
        category.push($(el).text());
      }
    });

    // AudioBook Language
    const lang = $('.postInfo a span[itemprop="inLanguage"]').text();

    // AudioBook Cover
    let cover;
    const coverUrl = $(".postContent")
      .find('img[itemprop="thumbnailUrl"]')
      .attr("src");

    if (coverUrl === "/images/default_cover.jpg") {
      cover = "http://audiobookbay.nl" + coverUrl;
    } else {
      cover = coverUrl;
    }

    // AudioBook Author/s
    const author = $(".desc").find('span[class="author"]').text();

    // AudioBook Voice Actor Name
    const read = $(".desc").find('span[class="narrator"]').text();

    // AudioBook Audio Sample in MP3
    let audioSample;
    if (AudioBook.data.search("<audio") !== -1) {
      audioSample = $(`audio`).attr("src");
    }

    // AudioBook Format
    const format = $(".desc").find('span[class="format"]').text();

    // AudioBook Bitrate
    const bitrate = $(".desc").find('span[class="bitrate"]').text();

    // AudioBook Abridged
    const abridged = $(".desc").find('span[class="is_abridged"]').text();

    // AudioBook Description
    const description = $(".desc").find("p:not(:first-child)").text();

    // AudioBook Torrent Size
    const size = $(
      ".postContent table tr:nth-last-child(11) td:last-child"
    ).text();

    // Audiobook Tracket, Torrent Hash
    const trackers = [];
    let hash;

    $(".postContent table tr").each((index, element) => {
      const tdFirst = $(element).find("td:first-child");
      const tdSecond = $(element).find("td:last-child");

      switch (tdFirst.text()) {
        case "Tracker:":
          trackers.push(tdSecond.text());
          break;

        case "Info Hash:":
          hash = tdSecond.text();
          break;

        default:
          break;
      }
    });

    const data = {
      title,
      category,
      lang,
      cover,
      author,
      read,
      audioSample,
      specs: {
        format,
        bitrate,
      },
      abridged,
      description,
      torrent: {
        hash,
        trackers,
        size,
      },
    };

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: `Audiobook Does not Exist's`,
    };
  }
};
