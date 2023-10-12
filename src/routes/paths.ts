const path = (root: string, sublink: string) => `${root}${sublink}`;

const ROOTS = "/";
const ROOTS_CHAPTER = "/chapter";

export const PATHS = {
  root: ROOTS,
  admin: path(ROOTS, "admin"),
  bookmark: path(ROOTS, "bookmark"),
  ipConfig: path(ROOTS, "ipConfig"),
  chapter: {
    root: ROOTS_CHAPTER,
    single: (id: string) => path(ROOTS_CHAPTER, `/${id}`),
  },
};
