const axios = require('axios');
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data;

        const phoneCodes = countries.map((country: any) => ({
            name: country.name.common,
            code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '')
        })).sort((a, b) => a.name.localeCompare(b.name))

     
        return res.status(200).json(phoneCodes)

    } catch (error) {
        console.error('Error fetching country data:', error);
    }
}

