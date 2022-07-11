import { SearchIn } from "@interface/search";

export const defaultSearchIn: SearchIn = {
  titleAuthor: true,
  content: true,
  torrent: true,
};

const getSearchInParam = (searchIn: SearchIn = defaultSearchIn) => {
  const realSearchIn = { ...defaultSearchIn, ...searchIn };

  const tt = [
    realSearchIn.titleAuthor ? "1" : "",
    realSearchIn.content ? "2" : "",
    realSearchIn.torrent ? "3" : "",
  ]
    .filter(Boolean)
    .join(",");

  return tt;
};

export default getSearchInParam;
