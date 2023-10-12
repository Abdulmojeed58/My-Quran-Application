import Link from "next/link";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks/useRedux";
import { quranActions } from "@/store/quranSlice";
import { PATHS } from "@/routes/paths";

const allLinks = [
  {
    linkName: "Home",
    path: PATHS.root,
  },
  {
    linkName: "Bookmark",
    path: PATHS.bookmark,
  },
  {
    linkName: "Admin",
    path: PATHS.admin,
  },
  {
    linkName: "IP Config",
    path: PATHS.ipConfig,
  },
];

const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-white shadow-md flex flex-col justify-between items-center md:flex-row px-5 md:px-10 py-7 text-[1.5rem]">
      <div>
        {router.pathname.includes("chapter") ||
        router.pathname.includes("bookmark") ||
        router.pathname.includes("admin") ||
        router.pathname.includes("ipConfig") ? null : (
          <button
            onClick={() => dispatch(quranActions.handleToggleNav())}
            className="absolute left-[15px]"
          >
            <MenuIcon style={{ fontSize: 30 }} />
          </button>
        )}
        <Link href={PATHS.root} className="ml-5 font-bold text-[1.5rem]">
          Quran
        </Link>
      </div>
      <ul className="flex gap-3 md:gap-5">
        {allLinks.map((link, i) => (
          <li
            key={i}
            className={`border-b-[2px] ${
              router.asPath === link.path
                ? "border-black"
                : "border-transparent"
            }`}
          >
            <Link href={link.path} className="text-[1.2rem] md:text-[1.5rem]">
              {link.linkName}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
