import { URLSearchParams } from "url";
import getAudiobook from "@utils/getAudiobook";
import getAudiobooks from "@utils/searchAudiobooks";
import { Categories, Tags } from "@interface/explore";
import { SearchIn } from "@interface/search";
import getSearchInParam, { defaultSearchIn } from "@utils/getSearchInParam";

/**
 * Search Audiobooks
 *
 * @param query Audiobook Search query
 * @param page Current Page
 * @returns Audiobook List
 */
export const search = async (
  query: string,
  page: number = 1,
  searchIn: SearchIn = defaultSearchIn
) => {
  const tt = getSearchInParam(searchIn);

  const params = new URLSearchParams({
    s: query.toLowerCase(),
    tt,
  });

  return await getAudiobooks(
    `http://audiobookbay.se/page/${page}/?${params.toString()}`
  );
};

/**
 * Get Single Audiobook
 *
 * @param audiobook Audiobook url
 * @returns Single Audiobook
 */
export const audiobook = async (audiobook: string) =>
  await getAudiobook(audiobook);

/**
 *
 * @param type Explore type Category/Tag
 * @param explore Category/Tag name
 * @param page Current Page
 * @returns Audiobook List
 */
export const explore = async (
  type: "category" | "tag",
  explore: Categories | Tags,
  page: number = 1
) => {
  const createURL = (
    type: "type" | "tag",
    typeOptions: Categories | Tags,
    page: number = 1
  ) => {
    return `http://audiobookbay.se/audio-books/${type}/${typeOptions}/${
      page !== 1 ? "page/" + page + "/" : ""
    }`;
  };

  switch (type) {
    case "category":
      return await getAudiobooks(createURL("type", explore, page));

    case "tag":
      return await getAudiobooks(createURL("tag", explore, page));

    default:
      return new Promise((resolve) => {
        resolve({
          success: false,
          message: "You can explore only by category and tag",
        });
      });
  }
};
