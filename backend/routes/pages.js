const express = require('express');
const router = express.Router();
const Page = require("../model/pageSchema");

/**
 * POST '/api/v1/pages/'
 * Accepts {text: String, type: String}
 */
router.post('/', async (req, res) => {
    try {
        const { text, cover, path } = req.body;

        console.log(text, path, cover)
        if (!text || !path) {
            res.status(400).json({
                message: 'Bad request'
            })
        }
        const page = new Page(req.body);
        await page.save();
        res.json({
            status: 'OK',
            message: 'Page created successfully!',
            page
        })
    } catch (error) {
        res.status(400).json({
            status: 'Bad request',
            message: `Error creating page: ${error.message}`
        });
    }
});

/**
 * GET '/api/v1/pages/'
 */
router.get('/', async (req, res) => {
    try {
        const pages = await Page.find();
        res.status(200).json({
            status: 'OK',
            message: 'Pages fetched successfully!',
            pages: pages.length,
            data: pages
        });
    } catch (error) {
        res.status(400).json({
            status: 'Bad request',
            message: `Error fetching pages: ${error.message}`
        });
    }
});

/**
 * GET '/api/v1/pages/:id'
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                status: 'Bad Request',
                message: 'Please provide an id',
            });
        }
        const page = await Page.findById(req.params.id);
        if (!page) {
            res.status(404).json({
                status: '404 Not Found',
                message: 'Page does not exist!',
            });
        }
        res.status(200).json({
            status: 'OK',
            message: 'Page fetched successfully!',
            page
        });
    } catch (error) {
        res.status(400).json({
            status: 'Bad request',
            message: `Error fetching page: ${error.message}`
        });
    }
});

/**
 * PUT '/api/v1/pages/:id'
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                status: 'Bad Request',
                message: 'Please provide an id',
            });
        }
        const page = await Page.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!page) {
            res.status(404).json({
                status: '404 Not Found',
                message: 'Page does not exist!',
            });
        }
        res.status(200).json({
            status: 'OK',
            message: 'Page updated successfully!',
            page
        });
    } catch (error) {
        res.status(400).json({
            status: 'Bad request',
            message: `Error fetching page: ${error.message}`
        });
    }
});

/**
 * DELETE '/api/v1/pages/:id'
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                status: 'Bad Request',
                message: 'Please provide an id',
            });
        }
        const page = await Page.findByIdAndDelete(req.params.id);
        if (!page) {
            res.status(404).json({
                status: '404 Not Found',
                message: 'Page does not exist!',
            });
        }
        res.status(200).json({
            status: 'OK',
            message: 'Page deleted successfully!',
            page
        });
    } catch (error) {
        res.status(400).json({
            status: 'Bad request',
            message: `Error fetching page: ${error.message}`
        });
    }
});

module.exports = router;
