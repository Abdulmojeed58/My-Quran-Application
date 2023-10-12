// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { logger } from "@/lib/logger";
import { getCacheControl, handleDefaultRoutes } from "@/lib/custom";
import { addToCache, client, getFromCache } from "@/lib/redis";
import { CacheKeys } from "@/utils/constants";

// client
//   .connect()
//   .then(() => logger.info("Redis connected"))
//   .catch((err) => console.log(err));

client
    .connect()
    .then(() => logger.info('Redis connected'))
    .catch((error) => logger.error(error, 'Redis Connection Error'))

export interface Chapter {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages?: number[];
  translated_name: {
    language_name: string;
    name: string;
  };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  logger.info(
    {
      headers: req.headers,
      method: req.method,
      url: req.url,
      body: req.body,
      query: req.query,
    },
    "[Chapters] Incoming API Request"
  );

  switch (req.method) {
    case "GET":
      return getChapters(req, res);
    default: {
      return handleDefaultRoutes(req, res);
    }
  }
}

async function getChapters(
  req: NextApiRequest,
  res: NextApiResponse<{ chapters: Chapter[] } | { message: string }>
) {
  try {
    const useCache = getCacheControl(req);

    let chapters: Chapter[] = [];

    // use cache if headers or query parameters does not forbid it
    if (useCache) {
      const foundInCache = (await getFromCache(
        CacheKeys.CHAPTERS
      )) as Chapter[];

      chapters = foundInCache || [];
    }

    // if no data is found in cache, make api call
    if (!chapters.length) {
      const res = await fetch(
        "https://api.quran.com/api/v4/chapters?language=en"
      );

      const data: { chapters: Chapter[] } = await res.json();

      chapters = data.chapters;

      // add to cache but do not await to delay api response
      // this is non blocking
      addToCache(CacheKeys.CHAPTERS, chapters, { expiry: 60 }).then(() =>
        logger.info({}, "[getChapters] data added to cache")
      );
    }

    // return api response
    return res.status(200).json({ chapters });
  } catch (error) {
    logger.error(error, "[getChapters] error getting chapters");
    return res.status(500).json({ message: "Internal server error" });
  }
}
