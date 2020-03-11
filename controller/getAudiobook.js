const request = require("request");
const cheerio = require("cheerio");

exports.getAudiobook = async (req, res, next) => {
  try {
    let data;
    let success = true;

    const url = `http://audiobookbay.nl/audio-books/${req.params.audiobook}/`;
    const getAudiobook = () => {
      return new Promise(resolve => {
        request(url, (error, response, html) => {
          if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            const title = $(".postTitle h1").text();
            const cat = [];
            const category = $(".postInfo a").each((index, el) => {
              if ($(el).attr("rel") === "category tag") {
                cat.push($(el).text());
              }
            });
            const lang = $('.postInfo a span[itemprop="inLanguage"]').text();
            const cover = $(".postContent")
              .find('img[itemprop="thumbnailUrl"]')
              .attr("src");
            const written = $(".desc")
              .find('span[class="author"]')
              .text();
            const read = $(".desc")
              .find('span[class="narrator"]')
              .text();
            const format = $(".desc")
              .find('span[class="format"]')
              .text();
            const bitrate = $(".desc")
              .find('span[class="bitrate"]')
              .text();
            const abridged = $(".desc")
              .find('span[class="is_abridged"]')
              .text();
            const desc = $(".desc")
              .find("p:not(:first-child)")
              .text();
            const torrentHash = $(
              ".postContent table tr:nth-last-child(7) td:last-child"
            ).text();
            const torrentSize = $(`span[style="color:#00f;"]`).text();
            const torrentSizeUnit = $(
              ".postContent table tr:nth-last-child(11) td:last-child"
            ).text();

            let audioSample = null;
            if (html.search("<audio") !== -1) {
              audioSample = $(`audio`).attr("src");
            }

            data = {
              title: title,
              category: cat,
              lang: lang,
              cover: cover,
              author: written,
              read: read,
              audioSample: audioSample,
              specs: {
                format: format,
                bitrate: bitrate
              },
              abridged: abridged,
              desc: desc,
              torrent: {
                magnet:
                  "magnet:" +
                  "?xt=urn:btih:" +
                  torrentHash +
                  "&dn=" +
                  title +
                  "&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969" +
                  "&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969" +
                  "&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce" +
                  "&tr=udp%3A%2F%2Ftracker.open-internet.nl%3A6969%2Fannounce" +
                  "&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A69691337%2Fannounce" +
                  "&tr=udp%3A%2F%2Ftracker.vanitycore.co%3A6969%2Fannounce" +
                  "&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce" +
                  "&tr=http%3A%2F%2Fretracker.telecom.by%3A80%2Fannounce" +
                  "&tr=http%3A%2F%2Ftracker.vanitycore.co%3A6969%2Fannounce",
                hash: torrentHash,
                size: [torrentSize, torrentSizeUnit.split(" ")[1]]
              }
            };

            resolve("resolved");
          } else {
            success = false;
            resolve("Resolved");
          }
        });
      });
    };

    await getAudiobook();

    if (!success) {
      return next({
        success: false,
        statusCode: 404,
        query: `Audiobook Does not Exist's`
      });
    }

    res.status(200).json({
      success: true,
      data: data
    });
  } catch (error) {
    next();
  }
};
