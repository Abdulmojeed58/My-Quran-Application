import {useState} from 'react';
import Image from "next/image";
import React from "react";
import ChapterList from "./ChapterLists";

interface SidebarProps {
  children: React.ReactNode;
}

const url = "";

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div className="h-screen md:grid grid-cols-3 lg:grid-cols-5 min-h-screen">
      <aside className={`fixed overflow-y-scroll top-0 left-0 bottom-0 w-[400px] max-w-full md:static md:w-auto px-3 bg-black ${isOpen ? "active" : "not-active"}`}>
        <div className="text-center text-[2rem] font-bold text-white p-7 mb-3">
          Quran
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
