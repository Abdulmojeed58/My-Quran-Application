export type IinitialState = {
  allChapterLists: any[];
  bookmarked: { verse: string; chapter: string; id: number; ip: string }[];
  isNavOpen: boolean;
};

export type ipAddressState = {
  ipLists: {
    ip: string;
    isRemovable: boolean;
  }[];
};

export interface Chapter {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages?: number[];
  translated_name: {
    language_name: string;
    name: string;
  };
}
