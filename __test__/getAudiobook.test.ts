import { audiobook } from "../src";
import { getAudiobook } from "../src/utils/getAudiobook";


describe("Get Audiobook", () => {

  test("get by id", async () => {
    const data = await getAudiobook(
      "the-road-to-dune-brian-herbert-kevin-j-anderson-frank-herbert"
    );

    expect(data).toEqual(
      expect.objectContaining({
        title: expect.any(String),
        categories: expect.any(Array),
        lang: expect.any(String),
        cover: expect.any(String),
        author: expect.any(String),
        read: expect.any(String),
        audioSample: expect.any(String),
        specs: {
          format: expect.any(String),
          bitrate: expect.any(String),
        },
        abridged: expect.any(String),
        description: expect.any(String),
        torrent: {
          hash: expect.any(String),
          trackers: expect.any(Array),
          size: expect.any(String),
          magnetUrl: expect.any(String),
        },
        related: expect.any(Array),
      })
    );
  });

  test("get by bad id", async () => {
    const data = await getAudiobook("NOT REAL ID");

    expect(data.title).toEqual(''); // TODO: This should likely fail better
  });

});


