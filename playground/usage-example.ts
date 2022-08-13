import pc from "picocolors"
import { AudioBookSearchResult } from "../src/interface/search";
import { search } from "../src/index";
import { getAudiobook } from "../src/utils/getAudiobook";



// search params
const searchTerm = 'John Bierce';
const titleFilter = 'mage';
const getMagnetLink = true;

async function main() {

  // setup variables
  const maxPages = 5;
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

    console.log(`${pos} - ${pc.green(item.title)} - ${pc.gray(item.id)}`)
    if (getMagnetLink) {
      // todo: do these in batches for faster performance
      const book = await getAudiobook(item.id);
      console.log('magnetUrl: ' + pc.yellow(pc.dim(book.torrent.magnetUrl)));
      console.log(pc.blue(`---------------`))
    }
    pos += 1;
  }
  console.log(`${pc.yellow('Search term:')} ${searchTerm}`)
  console.log(`${pc.yellow('Title Filter:')} ${titleFilter}`)
  console.log(`${pc.yellow('Result Count:')} ${searchResult.data.length}`)

}
main().then(() => {
  console.log(pc.green('--Done--'));
}).catch((ex) => {
  console.error(pc.red(`Error: ${ex}`))
});
