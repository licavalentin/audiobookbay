import cheerio from "cheerio";
import fetch from "node-fetch";

import { Audiobook, Pagination } from "@interface/search";

/**
 * Search Audiobooks
 *
 * @param {string} url URL for audiobooks to scrape
 */
export default async (url: string) => {
  try {
    const request = await fetch(url);
    const results = await request.text();
    const $ = cheerio.load(results);

    // Nothing is Found Error
    if ($(`#content h3`).text().trim() === "Not Found") {
      throw new Error("Nothing was found");
    }

    // Get Details for each audiobook
    const data: Audiobook[] = [];

    $(`#content div.post`).each((index, element) => {
      const audiobookTitleEl = $(element).find(`div.postTitle h2 a`);

      // Title
      const title = audiobookTitleEl.text();

      // Url
      let url: string | undefined;
      const urlEl = audiobookTitleEl.attr("href");

      if (urlEl) {
        url = urlEl.replace("/audio-books/", "").replace("/", "");
      }

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
      let cover: string | undefined;
      const coverUrl = $(element).find(`.postContent img`).attr("src");

      if (coverUrl === "/images/default_cover.jpg") {
        cover = "http://audiobookbay.se" + coverUrl;
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

    // Paggination
    const pagination: Pagination = {
      currentPage: 0,
      totalPages: 0,
      count: 0,
    };

    if ($(`.navigation .current`).text() !== "") {
      const currentPage = parseInt($(`.navigation .current`).text());
      let total: number = 0;

      if ($(`.navigation .wp-pagenavi a:last-child`).text() === "»»") {
        const totalEl = $(`.navigation .wp-pagenavi a:last-child`).attr("href");

        if (totalEl) {
          total = parseInt(totalEl.split("/page/")[1].split("/")[0], 10);
        }
      } else {
        total = parseInt(
          $(`.navigation .wp-pagenavi a:nth-last-child(2)`).text(),
          10
        );
      }

      if (total + 1 === currentPage) {
        total = currentPage;
      }

      pagination.currentPage = currentPage;
      pagination.totalPages = total;
      pagination.count = data.length;
    }

    return {
      success: true,
      pagination,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: `Nothing was found`,
    };
  }
};
