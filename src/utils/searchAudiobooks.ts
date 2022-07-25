import cheerio from "cheerio";
import fetch from "node-fetch";

import { Audiobook, Pagination } from "../interface/search";

/**
 * Search Audiobooks
 *
 * @param {string} url URL for audiobooks to scrape
 * @param {string} domain URL for audiobooks to scrape
 */
const searchAudiobooks = async (url: string, domain?: string) => {
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

    // ID
    let id = "";
    const urlEl = audiobookTitleEl.attr("href");

    if (urlEl) {
      id = urlEl.replace("/audio-books/", "").replace("/", "");
    }

    const postInfo = $(element)
      .find(`.postInfo`)
      .text();

    // Category
    const categories = postInfo
      .split("Language:")[0]
      .replace("Category:", "")
      .trim()
      .split(String.fromCharCode(160))
      .map((e) => e.trim());

    // Language
    let lang = ''

    if (postInfo.indexOf('Language:') >= 0 && postInfo.indexOf('Keywords:') >= 0) {
      lang = postInfo.split("Language: ")[1]
        .split(`Keywords:`)[0];
    }

    // Cover
    let cover: string = `${domain ?? "http://audiobookbay.se/images/default_cover.jpg"
      }`;
    const coverUrl = $(element).find(`.postContent img`).attr("src");

    if (coverUrl && coverUrl !== "") {
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

    const sizeUnitText = $(element)
      .find(`p[style="text-align:center;"]`)
      .text();

    let sizeUnit = ''
    if (sizeUnitText.indexOf(size) >= 0 && sizeUnitText.split(size).length > 0) {
      sizeUnit = sizeUnitText.split(size)[1].trim();
    }

    const audiobook = {
      title: title,
      id,
      categories,
      lang,
      cover,
      posted,
      info: {
        format,
        unit,
        size,
        sizeUnit,
      },
    } as Audiobook;

    data.push(audiobook);
  });

  // Paggination
  const pagination: Pagination = {
    currentPage: 0,
    totalPages: 0,
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
  }

  return {
    pagination,
    data,
  };
};

export { searchAudiobooks };
