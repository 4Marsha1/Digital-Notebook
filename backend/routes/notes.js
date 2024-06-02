const express = require('express');
const router = express.Router();
const Note = require("../model/noteSchema");

/**
 * POST '/api/v1/notes/'
 * Accepts {text: String, type: String}
 */
router.post('/', async (req, res) => {
    try {
        const { text, type, path } = req.body;
        if (!text || !type || !path) {
            res.status(400).json({
                message: 'Bad request'
            })
        }
        const note = new Note(req.body);
        await note.save();
        res.status(201).json({
            status: 'OK',
            message: 'Note created successfully!',
            note
        })
    } catch (error) {
        res.status(400).json({
            status: 'Bad request',
            message: `Error creating note: ${error.message}`
        });
    }
});

/**
 * GET '/api/v1/notes/'
 */
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        setTimeout(() => {
            res.status(200).json({
                status: 'OK',
                message: 'Notes fetched successfully!',
                notes: notes.length,
                data: notes
            });
        }, 3000)
    } catch (error) {
        res.status(400).json({
            status: 'Bad request',
            message: `Error fetching notes: ${error.message}`
        });
    }
});

/**
 * GET '/api/v1/notes/:id'
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
        const note = await Note.findById(req.params.id);
        if (!note) {
            res.status(404).json({
                status: '404 Not Found',
                message: 'Note does not exist!',
            });
        }
        res.status(200).json({
            status: 'OK',
            message: 'Note fetched successfully!',
            note
        });
    } catch (error) {
        res.status(400).json({
            status: 'Bad request',
            message: `Error fetching note: ${error.message}`
        });
    }
});

/**
 * PUT '/api/v1/notes/:id'
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
        const note = await Note.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!note) {
            res.status(404).json({
                status: '404 Not Found',
                message: 'Note does not exist!',
            });
        }
        res.status(200).json({
            status: 'OK',
            message: 'Note updated successfully!',
            note
        });
    } catch (error) {
        res.status(400).json({
            status: 'Bad request',
            message: `Error fetching note: ${error.message}`
        });
    }
});

/**
 * DELETE '/api/v1/notes/:id'
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
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            res.status(404).json({
                status: '404 Not Found',
                message: 'Note does not exist!',
            });
        }
        res.status(200).json({
            status: 'OK',
            message: 'Note deleted successfully!',
            note
        });
    } catch (error) {
        res.status(400).json({
            status: 'Bad request',
            message: `Error fetching note: ${error.message}`
        });
    }
});

module.exports = router;
