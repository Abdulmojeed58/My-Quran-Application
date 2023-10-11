import { IinitialState } from "@/interface/reduxInterface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IinitialState = {
  allChapterLists: [],
  bookmarked: [],
  isNavOpen: false,
};

const quranSlice = createSlice({
  name: "quran",
  initialState,
  reducers: {
    fetchQuranData(state, action) {
      state.allChapterLists = action.payload.chapters;
    },
    addOrRemoveBookmark(state, action) {
      const existingBookmarkIndex = state.bookmarked.findIndex(
        (bookmark) =>
          bookmark.id === action.payload.id &&
          bookmark.chapter === action.payload.chapter
      );

      const newBookmarkItem = {
        verse: action.payload.verse,
        chapter: action.payload.chapter,
        id: action.payload.id,
        ip: action.payload.ip,
      };

      if (existingBookmarkIndex !== -1) {
        state.bookmarked = state.bookmarked.filter(
          (_, index) => index !== existingBookmarkIndex
        );
      } else {
        state.bookmarked.push(newBookmarkItem);
      }
      localStorage.setItem(
        "bookmarkedVerses",
        JSON.stringify(state.bookmarked)
      );
    },
    replaceBookmarkedItem(state, action) {
      state.bookmarked = action.payload;
    },
    handleToggleNav(state) {
      state.isNavOpen = !state.isNavOpen;
    },
  },
});

export const quranActions = quranSlice.actions;

export default quranSlice.reducer;
