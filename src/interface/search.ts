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
