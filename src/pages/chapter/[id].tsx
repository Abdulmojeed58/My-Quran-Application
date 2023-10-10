import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

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

  const allWords = verses?.map((verse: any) => verse.words);
  const a = allWords?.flatMap((b:any)=>b?.map((c:any)=>c.transliteration.text))
  console.log(allWords);
  return <div>Chapter</div>;
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
