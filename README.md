# AudioBookBay REST API using NodeJS

<p><strong>AudioBookBay Client API in NodeJS</strong></p>

## Configuration

### Searching

<p>The URL</p>

<http://localhost:5000/search/:query/:page>

#### Response

```javascript
{
 success: true,
 count: "Audiobook Count",
 pagination: {
  currentPage: "Current Page",
  total: "Total Pages"
 },
 data: [
   {
     title: "Audiobook Title",
     url:
       "Audiobook URL Link",
     category:
       ["Array of Category's"],
     lang: "Audiobook Language",
     cover: "Audiobook Cover",
     posted: "Date when Audiobook was posted",
     info: {
         format: "Audiobook Format",
         bitrate: "Audiobook Bitrate",
         size: ["Audiobook Size","Size UNIT"]
     }
   }, ...
 ]
}
```

### Get Audiobook

<p>The URL</p>

<http://localhost:5000/audiobook/:audiobook>

1. :audiobook = Audiobook URL

#### Response

```javascript
{
 success:true,
 data: {
   title: "Audiobook title",
   category: ["Array of Category's"],
   lang: "Audiobook Language",
   cover: "Audiobook Cover",
   author: "Audiobook Author",
   read: "Audiobook Reader",
   audioSample: "Sample of Audiobook",
   specs: {
       format: "Audiobook Format",
       bitrate: "Audiobook Bitrate"
   },
   abridged: "Is the book shortened",
   desc: "Audiobook Description",
   torrent: {
       magnet: "Audiobook Magnet Link",
       hash: "Audiobook Hash",
       size: ["Audiobook size","Size UNIT"]
   }
 }
}
```
