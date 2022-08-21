
export interface AudiobookDetails {
  title: string;
  categories: string[];
  lang: string;
  cover: string | undefined;
  author: string;
  read: string;
  audioSample: string | undefined;
  specs: {
    format: string;
    bitrate: string;
  };
  abridged: string;
  description: string;
  torrent: {
    hash: string | undefined;
    trackers: string[];
    size: string;
    magnetUrl: string | undefined
  };
  related: {
    title: string;
    id: string | undefined;
  }[];
}
