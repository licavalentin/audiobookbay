export interface Audiobook {
  title: string;
  url: string | undefined;
  category: string[];
  lang: string;
  cover: string | undefined;
  posted: string;
  info: {
    format: string;
    unit: string;
    size: string[];
  };
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  count: number;
}

/**
 * Extra search options for what text content should be searched
 */
export interface SearchIn {
  /**
   * Search in Title and Authors fields
   *
   * @defaultValue true
   */
  titleAuthor: boolean;
  /**
   * Search in book page's Content
   *
   * @defaultValue true
   */
  content: boolean;
  /**
   * Search in the torrent's contents
   *
   * @defaultValue true
   */
  torrent: boolean;
}
