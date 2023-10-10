import Link from "next/link";
import React from "react";

interface QuranChapterItemProps {
  chapter: {
    name_simple: string;
    id: number;
    translated_name: { language_name: string; name: string };
    name_arabic: string;
  };
}

const QuranChapterItem: React.FC<QuranChapterItemProps> = ({ chapter }) => {
  return (
    <Link href={`/chapter/${chapter.id}`}>
      <div
        className="grid gap-5 border rounded-[10px] p-5 shadow-md cursor-pointer hover:text-blue-400"
        id={chapter.id.toString()}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-[500] text-[1.5rem] md:text-[2rem]">{chapter.id}:1</h1>
          <h3 className="font-bold text-[1.5rem] md:text-[2.5rem] text-[#000000dc]">{chapter.name_arabic}</h3>
        </div>
        <div>
          <h3 className="text-gray-500 font-[700]">Name</h3>
          <p className="text-[1.3rem]">{chapter.name_simple}</p>
        </div>
        <div>
          <h3 className="text-gray-500 font-[700]">Translation</h3>
          <p className="text-[1.3rem]">{chapter.translated_name.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default QuranChapterItem;
