import React from "react";
import Sidebar from "../Sidebar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div>
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default HomeLayout;
