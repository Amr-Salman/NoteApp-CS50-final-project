const express = require('express');
const router = express.Router();
const noteController = require('../controllers/notesController');

// Get all notes
router.get('/', noteController.get_all_notes);

// Create a note
router.post('/', noteController.create_note);

// Get a specific note
router.get('/:id', noteController.get_note);

// Delete a note
router.delete('/:id', noteController.delete_note);

// Update a note
router.put('/:id', noteController.update_note);

module.exports = router;
