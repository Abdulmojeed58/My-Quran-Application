import React from "react";
import ChapterList from "./ChapterLists";
import { useAppSelector } from "@/hooks/useRedux";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const isNavOpen = useAppSelector((state) => state.quran.isNavOpen);

  return (
    <div className="h-screen md:grid grid-cols-3 lg:grid-cols-5 min-h-screen">
      <aside
        className={`fixed overflow-y-scroll pt-[6rem] md:pt-0 top-0 left-0 bottom-0 w-[400px] max-w-full md:static md:w-auto px-3 bg-black transition-all duration-300 ease-in-out ${
          isNavOpen ? "active" : "not-active"
        }`}
      >
        <div className="text-center text-[2rem] font-bold text-white p-7 mb-3 mt-7">
          Chapters
        </div>
        <div className="">
          <ChapterList />
        </div>
      </aside>
      <div className="w-full bg-white md:col-span-2 lg:col-span-4">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
