const cheerio = require("cheerio");
const axios = require("axios");

exports.getAudiobook = async (req, res, next) => {
  // AudioBook URL
  // Some Url have characters not recognised by axios encodeURI
  const url = encodeURI(
    `http://audiobookbay.nl/audio-books/${req.params.audiobook}/`
  );

  // Fetch AudioBook
  await axios
    .get(url)
    .then((AudioBook) => {
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

      // AudioBook Torrent Hash
      const hash = $(
        ".postContent table tr:nth-last-child(7) td:last-child"
      ).text();

      // AudioBook Torrent Size
      const size = $(`span[style="color:#00f;"]`).text();

      // AudioBook Size in Unit
      const sizeUnit = $(
        ".postContent table tr:nth-last-child(11) td:last-child"
      )
        .text()
        .split(" ")[1];

      // AudioBook Magnet Link
      const magnet = `magnet:?xt=urn:btih:${hash}&dn=${title}&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.open-internet.nl%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A69691337%2Fannounce&tr=udp%3A%2F%2Ftracker.vanitycore.co%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Fretracker.telecom.by%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.vanitycore.co%3A6969%2Fannounce`;

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
          magnet,
          hash,
          size: [size, sizeUnit],
        },
      };

      res.status(200).json({
        success: true,
        data,
      });
    })
    .catch((err) => {
      return next({
        statusCode: 404,
        query: `Audiobook Does not Exist's`,
      });
    });
};
