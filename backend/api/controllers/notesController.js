const Note = require('../models/noteModel');

// api/notes GET METHOD
// @desc Get all notes
const get_all_notes = async (req, res) => {
  const user = req.user;
  try {
    const notes = await Note.find({ userID: user._id });
    res.status(200).json({ message: 'Get all notes', payload: notes });
  } catch (error) {
    res.status(400).json({ message: error.message, payload: {} });
  }
};

// api/notes/:id GET METHOD
// @desc Get a single note
const get_note = async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  try {
    const note = await Note.findById({ _id: id });
    if (note.userID.toString() !== user._id.toString()) {
      return res.status(400).json({ message: 'Access denied', payload: {} });
    }
    res.status(200).json({ message: 'Get a single note', payload: note });
  } catch (error) {
    res.status(400).json({ message: error.message, payload: {} });
  }
};

// api/notes/ POST METHOD
// @desc Create a note
const create_note = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400).json({ message: 'Please enter all fields', payload: {} });
  }
  try {
    const user = req.user;
    const note = await Note.create({
      title,
      description,
      userID: user._id,
    });
    res
      .status(201)
      .json({ message: 'Note created successfully', payload: note });
  } catch (error) {
    res.status(400).json({ message: error.message, payload: {} });
  }
};

// api/notes/:id DELETE METHOD
// @desc Delete a single note
const delete_note = async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  try {
    // Get the note and check if it belongs to the user
    const note = await Note.findById(id);
    if (note.userID.toString() !== user._id.toString()) {
      return res.status(400).json({ message: 'Access denied' });
    }
    // If it belongs to the user delete it
    await note.delete();
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message, payload: {} });
  }
};

// api/notes/:id UPDATE METHOD
const update_note = async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  try {
    // Get the note and check if it belongs to the user
    const note = await Note.findById(id);
    if (note.userID.toString() !== user._id.toString()) {
      return res.status(400).json({ message: 'Access denied', payload: {} });
    }

    // Validate the inputs
    if (
      !req.body.title ||
      !req.body.description ||
      req.body.title.trim().length <= 0 ||
      req.body.description.trim().length <= 0
    ) {
      return res
        .status(400)
        .json({ message: 'Note fields can not be empty', payload: {} });
    }
    // If it belongs to the user
    const updatedNote = await Note.findByIdAndUpdate(note._id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: 'Note Updated successfully', payload: updatedNote });
  } catch (error) {
    res.status(400).json({ message: error.message, payload: {} });
  }
};

module.exports = {
  get_all_notes,
  get_note,
  create_note,
  delete_note,
  update_note,
};
