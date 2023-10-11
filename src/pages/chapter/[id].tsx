import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import VerseItem from "@/components/VerseItem";

const Chapter = ({ data }: { data: any }) => {
  const params = useParams();
  const router = useRouter();
  const [verses, setVerses] = useState<any>();

  useEffect(() => {
    setVerses(data.verses);
  }, []);

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

  console.log(params);
  return (
    <div className="grid gap-5 mt-[3rem] md:mt-0 p-[2rem] md:p-[3rem] mx-auto">
      <h1 className="font-[600] text-[2rem]">Quran Chapter {params?.id}</h1>
      <div className="grid">
        {allVerses?.map((verse: string, i: number) => (
          <VerseItem
            key={i}
            verse={verse}
            number={i + 1}
            chapterId={String(params.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Chapter;

export async function getStaticPaths() {
  const res = await fetch("https://api.quran.com/api/v4/chapters?language=en");
  const data = await res.json();

  // Generate an array of objects containing the `params` object for each chapter
  const paths = data.chapters.map((chapter: any) => ({
    params: { id: `${chapter?.id}` },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const id = context.params.id;
  const res = await fetch(
    `https://api.quran.com/api/v4/verses/by_chapter/${id}?language=en&words=true`
  );

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
