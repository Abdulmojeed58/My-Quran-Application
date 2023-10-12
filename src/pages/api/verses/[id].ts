import type { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '@/lib/logger';
import { getCacheControl, handleDefaultRoutes } from '@/lib/custom';
import { addToCache, isRedisReady, connectRedis, getFromCache } from '@/lib/redis';
import { CacheKeys } from '@/utils/constants';


connectRedis();


export interface Verse {
    id: number;
    verse_number: number;
    verse_key: string;
    hizb_number: number;
    rub_el_hizb_number: number;
    ruku_number: number;
    manzil_number: number;
    sajdah_number?: null;
    page_number: number;
    juz_number: number;
    words?: {
        id: number;
        position: number;
        audio_url?: string | null;
        char_type_name: string;
        code_v1: string;
        page_number: number;
        line_number: number;
        text: string;
        translation: TranslationOrTransliteration;
        transliteration: Transliteration;
    }[];
}

export interface TranslationOrTransliteration {
    text: string;
    language_name: string;
}

export interface Transliteration {
    text?: string | null;
    language_name: string;
}

export interface Pagination {
    per_page: number;
    current_page: number;
    next_page?: number;
    total_pages: number;
    total_records: number;
}

export type VerseResponse = { verses: Verse[]; pagination: Pagination };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    logger.info(
        {
            headers: req.headers,
            method: req.method,
            url: req.url,
            body: req.body,
            query: req.query,
        },
        '[verses] Incoming API Request'
    );

    switch (req.method) {
        case 'GET':
            return getVerses(req, res);
        default: {
            return handleDefaultRoutes(req, res);
        }
    }
}

async function getVerses(
    req: NextApiRequest,
    res: NextApiResponse<VerseResponse | { message: string }>
) {
    try {
        // get the chapter id and the page
        // there's pagination, if you save to cache with the id alone
        // you will only be getting first page from the cache
        // save to cache with the id and page number
        let { id, page } = req.query;

        // validation against passing anything not a number as id
        if (!id || isNaN(Number(id))) {
            return res
                .status(400)
                .json({
                    message: 'Please specify valid number as chapter id in params',
                });
        }

        // add default page if page is not passed
        page = page || '1';

        const useCache = getCacheControl(req);

        // build cache key
        const key = `${CacheKeys.VERSE}-${id}-${page}`;

        let result: VerseResponse = {
            verses: [],
            pagination: {
                per_page: 0,
                current_page: 1,
                total_records: 0,
                total_pages: 0,
            },
        };

        // use cache if headers or query parameters does not forbid it
        if (useCache && isRedisReady) {
            const foundInCache = (await getFromCache(key)) as VerseResponse;

            result = foundInCache || result;
        }

        // if no data is found in cache, make api call
        if (!result.verses.length) {
            const res = await fetch(
                `https://api.quran.com/api/v4/verses/by_chapter/${id}?language=en&words=true&page=${page}`
            );

            result = (await res.json()) as VerseResponse;

            // add to cache but do not await to delay api response
            // this is non blocking
            if (isRedisReady) {
                addToCache(key, result, { expiry: 60 }).then(() =>
                    logger.info({}, '[getVerses] verses added to cache')
                );
            }
        }

        // return api response
        return res.status(200).json({ ...result });
    } catch (error) {
        logger.error(error, '[getVerses] error getting verses');
        return res.status(500).json({ message: 'Internal server error' });
    }
}