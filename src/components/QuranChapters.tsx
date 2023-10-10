import { useAppSelector } from "@/hooks/useRedux";
import React from "react";
import QuranChapterItem from "./QuranChapterItem";

const QuranChapters = () => {
  const chapters = useAppSelector((state) => state.quran.allChapterLists);
  return (
    <div className="grid gap-7 md:gap-[3rem] p-5 md:p-[3rem] lg:p-[7rem]">
      {chapters.map((chapter) => (
        <QuranChapterItem key={chapter.id} chapter={chapter} />
      ))}
    </div>
  );
};

export default QuranChapters;
