import { SearchIn } from "@interface/search";

export const defaultSearchIn: SearchIn = {
  titleAuthor: true,
  content: true,
  torrent: true,
};

const getSearchInParam = (searchIn: SearchIn = defaultSearchIn) => {
  const tt = [
    searchIn.titleAuthor ? "1" : "",
    searchIn.content ? "2" : "",
    searchIn.torrent ? "3" : "",
  ]
    .filter(Boolean)
    .join(",");

  return tt;
};

export default getSearchInParam;
