import { Audiobook, Pagination } from "../src/interface/search";

import getAudiobooks from "../src/utils/searchAudiobooks";

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

test("Search Audiobook", async () => {
  expectedData(
    await getAudiobooks(`http://audiobookbay.se/page/1/?s=dune&tt=1,2,3`)
  );
});

test("Explore Audiobook", async () => {
  expectedData(
    await getAudiobooks(
      `http://audiobookbay.se/audio-books/type/fantasy/page/2/`
    )
  );
});
