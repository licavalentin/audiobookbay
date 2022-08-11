import pc from "picocolors"
import { AudioBookSearchResult } from "../src/interface/search";
import { search } from "../src/index";
import { getAudiobook } from "../src/utils/getAudiobook";

describe("Search Audiobooks", () => {

  test("Search- temp", async () => {

    // search params
    const searchTerm = 'craig alanson';
    const titleFilter = '1';
    const getMagnetLink = true;

    // setup variables
    const maxPages = 5;
    const output: string[] = [];
    let currentPage = 0;
    let searchResult = {
      data: [],
      pagination: { currentPage: 0, totalPages: 1 },
    } as AudioBookSearchResult;

    // search for audio books
    while (currentPage < searchResult.pagination.totalPages && currentPage < maxPages) {
      currentPage += 1;
      const nextPage = await search(searchTerm.toLowerCase().trim(), currentPage);
      searchResult.data = searchResult.data.concat(nextPage.data); // add results to original array
      searchResult.pagination = nextPage.pagination; // update pagination
    }

    // apply additional filtering
    if (titleFilter.length > 0) {
      searchResult.data = searchResult.data.filter(book => {
        // filter by title
        return book.title.toLowerCase().indexOf(titleFilter.toLowerCase().trim()) >= 0;
      });
    }

    let pos = 1;
    for (const item of searchResult.data) {

      output.push(`${pos} - ${pc.green(item.title)} - ${pc.gray(item.id)}`)
      if (getMagnetLink) {
        // todo: do these in batches for faster performance
        const book = await getAudiobook(item.id);
        output.push('magnetUrl: ' + pc.yellow(pc.dim(book.torrent.magnetUrl)));
        output.push(pc.blue(`---------------`))
      }
      pos += 1;
    }
    output.push(`Search term: ${searchTerm}`)
    output.push(`Results: ${searchResult.data.length}`)

    console.log(output.join('\n'))
  });

});
