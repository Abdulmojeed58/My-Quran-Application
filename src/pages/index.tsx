import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { quranActions } from "@/store/quranSlice";
import QuranChapters from "@/components/QuranChapters";
import { fetchBookmarkedItem } from "@/store/bookmark-action";

export default function Home() {
  const dispatch = useAppDispatch();
  const { isLoading, isError } = useAppSelector((state) => state.quran);

  useEffect(() => {
    fetchData();
    dispatch(fetchBookmarkedItem());
  }, []);

  const fetchData = async () => {
    dispatch(quranActions.handleLoading(true));
    dispatch(quranActions.handleError(false));
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

      dispatch(quranActions.fetchQuranData(data));
    } catch (error) {
      dispatch(quranActions.handleError(false));

      console.log(error);
    } finally {
      dispatch(quranActions.handleLoading(false));
    }
  };

  if (isLoading) {
    return <p className="pt-[7rem] text-center text-[2rem]">Loading...</p>;
  }

  return (
    <main
      className={`h-screen overflow-y-scroll font-custom pt-[6rem] md:pt-0`}
    >
      <QuranChapters />
    </main>
  );
}
