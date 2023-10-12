import React from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import PlayDisabledIcon from "@mui/icons-material/PlayDisabled";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { quranActions } from "@/store/quranSlice";
import {
  addItemToBookmark,
  removeBookmarkedItem,
} from "@/store/bookmark-action";

interface VerseItemProps {
  verse: string;
  number: number;
  chapterId: string;
  handleBookmark: boolean;
}

const VerseItem: React.FC<VerseItemProps> = ({
  verse,
  number,
  chapterId,
  handleBookmark = false,
}) => {
  const { bookmarked } = useAppSelector((state) => state.quran);
  const isBookmarked = bookmarked.some(
    (bookmark) => bookmark.id === number && bookmark.chapter === chapterId
  );
  const dispatch = useAppDispatch();

  const getCurrentIp = async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");

      if (!res.ok) {
        throw new Error("An Error occured");
      }
      const data = await res.json();
      return data.ip;
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleToggleBookmark = async () => {
    if (!handleBookmark) return;
    const newBookmark = {
      verse,
      chapter: chapterId,
      id: number,
      ip: await getCurrentIp(),
    };

    const existingBookmarkIndex = bookmarked.find(
      (bookmark) => bookmark.id === number && bookmark.chapter === chapterId
    );

    dispatch(quranActions.addOrRemoveBookmark(newBookmark));

    if (existingBookmarkIndex) {
      dispatch(removeBookmarkedItem(newBookmark));
      console.log("removed");
      return;
    }

    dispatch(addItemToBookmark(newBookmark));
    console.log("added");
  };

  return (
    <div className="pt-[4rem] pb-[2rem] border-b flex gap-[1rem] md:gap-[4.5rem] items-end w-full">
      <div className="grid gap-3 items-center text-[1.2rem]">
        <button className="btn">
          <p>
            {chapterId}:{number}
          </p>
        </button>
        <button className="btn">
          <PlayDisabledIcon />
        </button>
        <button
          className="btn relative bookmark"
          aria-label="bookmark"
          onClick={() => handleToggleBookmark()}
        >
          {!isBookmarked ? <BookmarkBorderIcon /> : <BookmarkAddedIcon />}
          <span className="absolute text-[0.7rem] p-2 rounded-[8px] bg-gray-400 top-[105%] left-[70%] text-white">
            Bookmark
          </span>
        </button>
        <button className="btn">
          <MoreHorizIcon />
        </button>
      </div>
      <div className="max-w-[700px] pb-[2rem]">
        <p className="leading-[2rem] text-[1.3rem]">{verse}</p>
      </div>
    </div>
  );
};

export default React.memo(VerseItem);
