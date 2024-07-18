import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { path, param } = req.body;
    const url = `${process.env.BACKEND_BASE_URL}/${path}`;

    try {
        const { data } = await axios.post(url, param, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: req.headers.authorization ?? '',
            },
            timeout: 60000,
        });
        res.json(data);
    } catch (error: any) {
        res.status(400).json(error?.response?.data);
    }
}
