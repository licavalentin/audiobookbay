const request = require("request");
const cheerio = require("cheerio");

exports.searchAudiobook = async (req, res, next) => {
  try {
    const data = [];
    let paggination;
    let success = true;

    const url = `http://audiobookbay.nl/page/${
      req.params.page
    }/?s=${req.params.query.toLowerCase()}`;
    const searchAudiobook = () => {
      return new Promise(resolve => {
        request(url, (error, response, html) => {
          if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            if ($(`#content h3`).text() !== "Not Found") {
              // Get Detail
              $(`#content div.post`).each((index, element) => {
                // console.log("bruh");

                // Title
                const title = $(element)
                  .find(`h2 a`)
                  .text();
                // Url
                const url = $(element)
                  .find(`h2 a`)
                  .attr("href")
                  .replace("/audio-books/", "/audiobook/");
                // Category
                const category = $(element)
                  .find(`.postInfo`)
                  .text()
                  .split("Language:")[0]
                  .replace("Category:", "")
                  .trim()
                  .split(" ")
                  .map(e => e.trim());
                // Language
                const lang = $(element)
                  .find(`.postInfo`)
                  .text()
                  .split("Language: ")[1]
                  .split(`Keywords:`)[0];
                // Cover
                const cover = $(element)
                  .find(`.postContent img`)
                  .attr("src");
                // Posted
                const posted = $(`p[style="text-align:center;"]`)
                  .text()
                  .split("Posted:")[1]
                  .split("Format:")[0]
                  .trim();
                // Format
                const format = $(element)
                  .find(`.postContent span[style="color:#a00;"]:nth-child(2)`)
                  .text();
                // Unit
                const unit = $(element)
                  .find(`.postContent span[style="color:#a00;"]:nth-child(3)`)
                  .text();
                // Size
                const size = $(element)
                  .find(`.postContent span[style="color:#00f;"]`)
                  .text();
                const sizeUnit = $(element)
                  .find(`p[style="text-align:center;"]`)
                  .text()
                  .split(size)[1]
                  .trim();

                const audiobook = {
                  title: title,
                  url: url,
                  category: category,
                  lang: lang,
                  cover: cover,
                  posted: posted,
                  info: {
                    format: format,
                    unit: unit,
                    size: [size, sizeUnit]
                  }
                };

                data.push(audiobook);
              });

              if ($(`.navigation .current`).text() !== "") {
                // Paggination
                const page = $(`.navigation .current`).text();
                let total;

                if (
                  $(`.navigation .wp-pagenavi a:last-child`).text() === "»»"
                ) {
                  total = $(`.navigation .wp-pagenavi a:last-child`)
                    .attr("href")
                    .split("/page/")[1]
                    .split("/")[0];
                } else {
                  total = $(
                    `.navigation .wp-pagenavi a:nth-last-child(2)`
                  ).text();
                }

                paggination = {
                  currentPage: page,
                  total: total
                };
              }
            } else {
              success = false;
            }

            resolve("Resolved");
          }
        });
      });
    };

    await searchAudiobook();

    if (!success) {
      return next({
        success: false,
        statusCode: 404,
        query: `No Audiobook with Title of ${req.params.query} Exist's`
      });
    }

    res.status(200).json({
      success: true,
      count: data.length,
      paggination: paggination,
      data: data
    });
  } catch (error) {
    next();
  }
};
