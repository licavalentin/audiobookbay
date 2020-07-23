# AudioBookBay Scraper NodeJS

## Install

```
npm install audiobookbay
```

## Usage

### Searching by Query

```js
const audiobookbay = require("audiobookbay");

audiobookbay.search("thor", 2);
// ("query","page")

// Response
// {
//  success: true,
//  count: "Audiobook Count",
//  pagination: {
//   currentPage: "Current Page",
//   total: "Total Pages"
//  },
//  data: [
//    {
//      title: "Audiobook Title",
//      url:
//        "Audiobook URL",
//      category:
//        ["Array of Category's"],
//      lang: "Audiobook Language",
//      cover: "Audiobook Cover",
//      posted: "Date when Audiobook was posted",
//      info: {
//          format: "Audiobook Format",
//          bitrate: "Audiobook Bitrate",
//          size: ["Audiobook Size","Size UNIT"]
//      }
//    }, ...
//  ]
// }
```

## Documentation

| Name  | Description  | Default | Type   |
| ----- | ------------ | ------- | ------ |
| Query | Search Query |         | String |
| Page  | Search Page  | 1       | Number |

### Exploring By Category/Tag

```js
const audiobookbay = require("audiobookbay");

audiobookbay.explore("tag", "english");
// ("category/tag","categroy/tag query")

// Response
// {
//  success: true,
//  count: "Audiobook Count",
//  pagination: {
//   currentPage: "Current Page",
//   total: "Total Pages"
//  },
//  data: [
//    {
//      title: "Audiobook Title",
//      url:
//        "Audiobook URL",
//      category:
//        ["Array of Category's"],
//      lang: "Audiobook Language",
//      cover: "Audiobook Cover",
//      posted: "Date when Audiobook was posted",
//      info: {
//          format: "Audiobook Format",
//          bitrate: "Audiobook Bitrate",
//          size: ["Audiobook Size","Size UNIT"]
//      }
//    }, ...
//  ]
// }
```

### Category Options

<ul>
  <li>
    Age:
    <ul>
      <li>children</li>
      <li>teen-young-adult</li>
      <li>adults</li>
      <li>the-undead</li>
    </ul>
  </li>
  <li>
    Category:
    <ul>
      <li>postapocalyptic</li>
      <li>action</li>
      <li>adventure</li>
      <li>art</li>
      <li>autobiography-biographies</li>
      <li>business</li>
      <li>computer</li>
      <li>contemporary</li>
      <li>crime</li>
      <li>detective</li>
      <li>doctor-who-sci-fi</li>
      <li>education</li>
      <li>fantasy</li>
      <li>general-fiction</li>
      <li>historical-fiction</li>
      <li>history</li>
      <li>horror</li>
      <li>lecture</li>
      <li>lgbt</li>
      <li>literature</li>
      <li>litrpg</li>
      <li>general-non-fiction</li>
      <li>mystery</li>
      <li>paranormal</li>
      <li>plays-theater</li>
      <li>poetry</li>
      <li>political</li>
      <li>radio-productions</li>
      <li>romance</li>
      <li>sci-fi</li>
      <li>science</li>
      <li>self-help</li>
      <li>spiritual</li>
      <li>sports</li>
      <li>suspense</li>
      <li>thriller</li>
      <li>true-crime</li>
      <li>tutorial</li>
      <li>westerns</li>
    </ul>
  </li>

  <li>
    Category Modifiers:
    <ul>
      <li>anthology</li>
      <li>bestsellers</li>
      <li>classic</li>
      <li>documentary</li>
      <li>full-cast</li>
      <li>libertarian</li>
      <li>military</li>
      <li>novel</li>
      <li>short-story</li>
    </ul>
  </li>
</ul>

### Tag Options

<ul>
<li>
Popular Language:
<ul>

<li>english</li>
  <li>dutch</li>
  <li>french</li>
  <li>spanish</li>
  <li>german</li>
</ul>
</li>
  
</ul>

### Get Audiobook

```js
const audiobookbay = require("audiobookbay");

audiobookbay.audiobook("example-example");
// ("audiobook url")

// Response
// {
//  success:true,
//  data: {
//    title: "Audiobook title",
//    category: ["Array of Category's"],
//    lang: "Audiobook Language",
//    cover: "Audiobook Cover",
//    author: "Audiobook Author",
//    read: "Audiobook Reader",
//    audioSample: "Sample of Audiobook",
//    specs: {
//        format: "Audiobook Format",
//        bitrate: "Audiobook Bitrate"
//    },
//    abridged: "Is the book shortened",
//    desc: "Audiobook Description",
//    torrent: {
//        magnet: "Audiobook Magnet Link",
//        hash: "Audiobook Hash",
//        size: ["Audiobook size","Size UNIT"]
//    }
//  }
// }
```
