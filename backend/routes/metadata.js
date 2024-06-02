const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { url } = req.body;

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const title = $('head title').text();
        const description = $('meta[name="description"]').attr('content');
        const imageUrl = $('meta[property="og:image"]').attr('content');
        const metadata = { title, description, imageUrl };
        res.status(200).json({
            ...metadata,
            url
        });
    } catch (error) {
        console.error('Error fetching metadata:', error);
        res.status(500).json({ error: 'Could not fetch metadata' });
    }
});

module.exports = router;