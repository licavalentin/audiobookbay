const cheerio = require("cheerio");
const axios = require("axios");

module.exports = async (url, data, paggination, notFound) => {
  await axios
    .get(url)
    .then((audioBookSearch) => {
      const $ = cheerio.load(audioBookSearch.data);

      // Nothing is Found Error
      if ($(`#content h3`).text().trim() === "Not Found") {
        notFound.success = false;
      }

      // Get Detail
      $(`#content div.post`).each((index, element) => {
        // Title
        const title = $(element).find(`h2 a`).text();

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
          .map((e) => e.trim());

        // Language
        const lang = $(element)
          .find(`.postInfo`)
          .text()
          .split("Language: ")[1]
          .split(`Keywords:`)[0];
        // Cover
        let cover;
        const coverUrl = $(element).find(`.postContent img`).attr("src");

        if (coverUrl === "/images/default_cover.jpg") {
          cover = "http://audiobookbay.nl" + coverUrl;
        } else {
          cover = coverUrl;
        }

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
            size: [size, sizeUnit],
          },
        };

        data.push(audiobook);
      });

      if ($(`.navigation .current`).text() !== "") {
        // Paggination
        const page = parseInt($(`.navigation .current`).text());
        let total;

        if ($(`.navigation .wp-pagenavi a:last-child`).text() === "»»") {
          total = parseInt(
            $(`.navigation .wp-pagenavi a:last-child`)
              .attr("href")
              .split("/page/")[1]
              .split("/")[0],
            10
          );
        } else {
          total = parseInt(
            $(`.navigation .wp-pagenavi a:nth-last-child(2)`).text(),
            10
          );
        }

        if (total + 1 === page) {
          total = page;
        }

        paggination.currentPage = page;
        paggination.totalPages = total;
        paggination.count = data.length;
      }
    })
    .catch((e) => {
      notFound.success = false;
    });
};
