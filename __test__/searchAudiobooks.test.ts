import { Audiobook, Pagination } from "../src/interface/search";
import { explore, search } from "../src/index";

import { searchAudiobooks } from "../src/utils/searchAudiobooks";

const expectedData = (data: { pagination: Pagination; data: Audiobook[] }) => {
  expect(data).toEqual(
    expect.objectContaining({
      pagination: {
        currentPage: expect.any(Number),
        totalPages: expect.any(Number),
      },
      data: expect.arrayContaining([
        {
          title: expect.any(String),
          id: expect.any(String),
          categories: expect.any(Array),
          lang: expect.any(String),
          cover: expect.any(String),
          posted: expect.any(String),
          info: {
            format: expect.any(String),
            unit: expect.any(String),
            size: expect.any(String),
            sizeUnit: expect.any(String),
          },
        },
      ]),
    })
  );
};


describe("Search Audiobooks", () => {

  test("Search Audiobook", async () => {
    expectedData(
      await searchAudiobooks(`http://audiobookbay.se/page/1/?s=dune&tt=1,2,3`)
    );
  });

  test("Explore Audiobook", async () => {
    expectedData(
      await searchAudiobooks(
        `http://audiobookbay.se/audio-books/type/fantasy/page/2/`
      )
    );
  });


  test("Search", async () => {
    const data = await search("dune");
    expect(data.pagination.totalPages).toBeGreaterThan(1)
    expectedData(data)
  });

  test("Search - has cached result as Base64", async () => {
    // was searching Sci Fi and it kept parsing error on this book. 
    // turns out is does a base64 body some titles.... no idea how often this happens but seems really rare.
    // To test: view http://audiobookbay.fi/?s=Centauri+Bliss with javascript disabled
    const result = await search("Centauri Bliss");
    expectedData(result)

  });

  test("explore category", async () => {
    const data = await explore("category", 'sci-fi');
    expect(data.pagination.totalPages).toBeGreaterThan(1)
    expectedData(data)
  });


  test("category with spaces parse - issue #6", async () => {
    const data = await explore("category", 'teen-young-adult');
    expect(data.pagination.totalPages).toBeGreaterThan(100)
    expectedData(data)
    expect(data.data[0].categories).toContain('Teen & Young Adult');
  });

  test("explore tag", async () => {
    const data = await explore("tag", 'german');
    expect(data.pagination.totalPages).toBeGreaterThan(1);
    expectedData(data)
  });

});
