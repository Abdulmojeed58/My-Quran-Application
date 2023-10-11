import VerseItem from "@/components/VerseItem";
import { useAppSelector } from "@/hooks/useRedux";
import React, { useEffect, useState } from "react";

const Bookmark = () => {
  const bookmarked = useAppSelector((state) => state.quran.bookmarked);
  const [currentIp, setCurrentIp] = useState<string | null>(null);

  useEffect(() => {
      getCurrentIp();

  }, []);

  const getCurrentIp = async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");

      if (!res.ok) {
        throw new Error("An Error occured");
      }
      const data = await res.json();
      setCurrentIp(data.ip);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const bookmarkedBasedOnIp = bookmarked.filter(
    (bookmarked) => bookmarked.ip === currentIp
  );

  if (bookmarkedBasedOnIp.length === 0) {
    return (
      <p className="py-[7rem] md:py-[3rem] text-center px3">
        No bookmarked verse available. Please add a verse to bookmark.
      </p>
    );
  }

  return (
    <div className="grid gap-5 p-[2rem] md:p-[3rem] mx-auto">
      <div className="grid">
        {bookmarkedBasedOnIp?.map(({ verse, chapter, id }, i) => (
          <VerseItem key={i} verse={verse} number={id} chapterId={chapter} />
        ))}
      </div>
    </div>
  );
};

export default Bookmark;
