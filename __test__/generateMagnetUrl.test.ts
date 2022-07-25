import { generateMagnetUrl } from "../src/utils/generateMagnetUrl";


describe("generateMagnetUrl", () => {

  test("normal magnet link", async () => {
    const url = generateMagnetUrl("123123", "test", [])
    expect(url).toBe('magnet:?xt=urn:btih:123123&dn=test&tr=')
  });


  test("title with spaces", async () => {
    const url = generateMagnetUrl("123123", "this is a long title", [])
    expect(url).toBe('magnet:?xt=urn:btih:123123&dn=this%20is%20a%20long%20title&tr=')
  });

  test("with trackers", async () => {
    const url = generateMagnetUrl("123123", "test", ['http://tracker.fake.com1', 'http://tracker.fake.com2'])
    expect(url).toBe('magnet:?xt=urn:btih:123123&dn=test&tr=http://tracker.fake.com1&tr=http://tracker.fake.com2')
  });


});


