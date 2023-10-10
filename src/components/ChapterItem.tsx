import React from "react";

interface ChapterItemProps {
  chapter: {
    name_simple: string;
    id: number;
    translated_name: { language_name: string; name: string };
    name_arabic: string;
  };
}

const ChapterItem = ({ chapter }: ChapterItemProps) => {
  return (
    <a href={`#${chapter.id}`}>
      <li className="grid grid-cols-7 text-[#ffffffc4] hover:text-blue-400 list">
        <p>{chapter.id}</p>
        <div className="col-span-4">
          <h2 className="font-[700] text-[#ffffffec] hover:text-blue-400">{chapter.name_simple}</h2>
          <p>{chapter.translated_name.name}</p>
        </div>
        <p className="col-span-2">{chapter.name_arabic}</p>
      </li>
    </a>
  );
};

export default ChapterItem;
