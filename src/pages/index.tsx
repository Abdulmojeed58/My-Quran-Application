import { useEffect } from "react";
import { Inter } from "next/font/google";
import { useAppDispatch } from "@/hooks/useRedux";
import { quranActions } from "@/store/quranSlice";
import QuranChapters from "@/components/QuranChapters";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: { data: any }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(quranActions.fetchQuranData(props.data));
  }, []);

  // console.log(props.list);
  return (
    <main className={`h-screen overflow-y-scroll ${inter.className}`}>
      {/* <div>{JSON.stringify(props.list)}</div> */}
      <h2>Home</h2>
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
