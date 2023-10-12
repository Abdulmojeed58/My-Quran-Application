import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { quranActions } from "@/store/quranSlice";
import QuranChapters from "@/components/QuranChapters";
import { fetchBookmarkedItem } from "@/store/bookmark-action";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchData()
    dispatch(fetchBookmarkedItem())
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/chapters`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch Data");
      }

      const data = await res.json();

      dispatch(quranActions.fetchQuranData(data))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={`h-screen overflow-y-scroll font-custom pt-[6rem] md:pt-0`}>
      <QuranChapters />
    </main>
  );
}