import Link from "next/link";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks/useRedux";
import { quranActions } from "@/store/quranSlice";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-white shadow-md flex flex-col justify-between items-center md:flex-row px-5 md:px-10 py-7 text-[1.5rem]">
      <div>
        {router.pathname.includes("chapter") ||
        router.pathname.includes("bookmark") ? null : (
          <button
            onClick={() => dispatch(quranActions.handleToggleNav())}
            className="absolute left-[15px]"
          >
            <MenuIcon style={{ fontSize: 30 }} />
          </button>
        )}
        <Link href="/" className="ml-5 font-bold text-[1.5rem]">
          Quran
        </Link>
      </div>
      <ul className="flex gap-3 md:gap-5">
        <li
          className={`border-b-[2px] ${
            router.asPath === "/" ? "border-black" : "border-transparent"
          }`}
        >
          <Link href="/" className="text-[1.3rem] md:text-[1.5rem]">
            Home
          </Link>
        </li>
        <li
          className={`border-b-[2px] ${
            router.asPath === "/bookmark" ? "border-black" : "border-transparent"
          }`}
        >
          <Link href="/bookmark" className="text-[1.3rem] md:text-[1.5rem]">
            Bookmark
          </Link>
        </li>
        <li
          className={`border-b-[2px] ${
            router.asPath === "/admin" ? "border-black" : "border-transparent"
          }`}
        >
          <Link href="/admin" className="text-[1.3rem] md:text-[1.5rem]">
            Admin
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
