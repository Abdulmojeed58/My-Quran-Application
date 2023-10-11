import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { quranActions } from "@/store/quranSlice";
import QuranChapters from "@/components/QuranChapters";
import { fetchBookmarkedItem } from "@/store/bookmark-action";

export default function Home(props: { data: any }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(quranActions.fetchQuranData(props.data));
    dispatch(fetchBookmarkedItem())
  }, []);

  return (
    <main className={`h-screen overflow-y-scroll font-custom pt-[6rem] md:pt-0`}>
      <QuranChapters />
    </main>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://api.quran.com/api/v4/chapters?language=en");

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
