const generateMagnetUrl = (hash: string,title: string, trackers: string[]):   string | undefined => {

    let magnetUrl = undefined;
    if(hash.length > 0) {
      magnetUrl = `magnet:?xt=urn:btih:${hash}&dn=${encodeURIComponent(title)}&tr=${trackers.join("&tr=")}`;
    }
  
    return magnetUrl;
}

export { generateMagnetUrl };