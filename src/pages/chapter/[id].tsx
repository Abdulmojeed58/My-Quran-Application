import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import VerseItem from "@/components/VerseItem";

const Chapter = () => {
  const params = useParams();
  const router = useRouter();
  const [verses, setVerses] = useState<any>();
  const [currentChapter, setCurrentChapter] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
    setCurrentChapter(String(params.id));
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/verses/${params.id}`, {
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
            number={i + 1}
            chapterId={String(currentChapter)}
            handleBookmark={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Chapter;
