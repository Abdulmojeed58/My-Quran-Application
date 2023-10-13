import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import VerseItem from "@/components/VerseItem";

const Chapter = () => {
  const params = useParams();
  const router = useRouter();
  const [verses, setVerses] = useState<any>();
  const [currentChapter, setCurrentChapter] = useState<string | null>(null);
  // const [totalPages, setTotalPages] = useState<number | null>(null);
  const [paginationNumber, setPaginationNumber] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchData();
    setCurrentChapter(String(params.id));
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/verses/${params.id}?page=${currentPage}`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch Data");
      }

      const data = await res.json();

      setVerses(data.verses);

      const totalPages = data.pagination.total_pages;

      const pagesArray = [];

      for (let i = 1; i <= totalPages; i++) {
        pagesArray.push(i);
      }

      setPaginationNumber(pagesArray);
    } catch (error) {
      console.log(error);
    }
  };


  if (router.isFallback) {
    // Render a loading indicator or fallback component
    return <div>Loading...</div>;
  }

  const allVerses = verses
    ?.map((verse: any) => verse.words)
    ?.map((b: any) =>
      b?.flatMap((c: any) => c?.transliteration.text).join(" ")
    );

  if (allVerses?.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid gap-5 mt-[3rem] md:mt-0 p-[2rem] md:p-[3rem] mx-auto">
      <h1 className="font-[600] text-[2rem]">Quran Chapter {currentChapter}</h1>
      <div className="grid">
        {allVerses?.map((verse: string, i: number) => (
          <VerseItem
            key={i}
            verse={verse}
            number={verses[i].verse_number}
            chapterId={String(currentChapter)}
            handleBookmark={true}
          />
        ))}
      </div>
      <div className="my-[1rem] flex gap-[1rem] flex-wrap justify-center">
        {paginationNumber.length > 1 &&
          paginationNumber.map((number) => (
            <button
              key={number}
              className={`btn ${currentPage === number ? "bg-red-400" : ""}`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Chapter;
