import { quranActions } from "./quranSlice";

const url = "https://quran-app-5072d-default-rtdb.firebaseio.com/bookmark.json";

export const fetchBookmarkedItem = () => {
  return async (dispatch: any) => {
    const fetchBookmark = async () => {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Could not fetch bookmark!");
      }

      const data = await res.json();
      const bookmarks = Object.keys(data).map((key: string) => {
        return data[key];
      });
      return bookmarks;
    };

    try {
      const data = await fetchBookmark();
      dispatch(quranActions.replaceBookmarkedItem(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addItemToBookmark = (item: {
  verse: string;
  chapter: string;
  id: number;
  ip: string;
}) => {
  return async () => {
    const updateBookmark = async () => {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(item),
      });

      if (!res.ok) {
        throw new Error("Could not add bookmark!");
      }

      const data = await res.json();

      return data;
    };

    try {
      const data = await updateBookmark();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeBookmarkedItem = (item: {
  verse: string;
  chapter: string;
  id: number;
  ip: string;
}) => {
  return async () => {
    const fetchBookmark = async () => {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Could not fetch bookmark!");
      }

      const data = await res.json();

      let bookmarkKey = null;

      Object.keys(data).forEach((key) => {
        if (data[key].id === item.id && data[key].chapter === item.chapter) {
          bookmarkKey = key;
        }
      });

      if (!bookmarkKey) {
        throw new Error("Bookmark not found!");
      }

      const deleteUrl = `https://quran-app-5072d-default-rtdb.firebaseio.com/bookmark/${bookmarkKey}.json`;

      const deleteResponse = await fetch(deleteUrl, {
        method: "DELETE",
      });

      if (!deleteResponse.ok) {
        throw new Error("Could not delete bookmark!");
      }
    };

    try {
      await fetchBookmark();
    } catch (error) {
      console.log(error);
    }
  };
};
