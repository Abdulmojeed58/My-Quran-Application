import { NextApiRequest, NextApiResponse } from 'next';

export function getCacheControl(req: NextApiRequest): boolean {
    if (req.headers['Cache-Control'] && req.headers['Cache-Control'] === 'no-cache') return false;

    return req.query?.cache_control !== 'no-cache';
}

export function handleDefaultRoutes(req: NextApiRequest, res: NextApiResponse) {
    return res.status(200).json({ message: 'Route or method not supported' });
}
