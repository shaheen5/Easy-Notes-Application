const NoteService = require('../services/note.service');

// Create and Save a new Note
exports.create = (req, res) => {
    //validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content cannot be empty"
        });
    }
    NoteService.createNote(req.body)
        .then((result) => {
            console.log("createdNote", result);
            res.send(result);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    NoteService.findAll()
        .then((notes) => {
            if (!notes) {
                res.status(404).send("There are no notes created yet!");
            }
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    NoteService.findOne(req.params.noteId)
        .then((note) => {
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    //validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content cannot be empty"
        });
    }
    NoteService.update(req.params.noteId, req.body)
        .then((note) => {
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    NoteService.delete(req.params.noteId)
        .then((message) => {
            res.send(message);
        }).catch(err=>{
            return res.status(500).send({
                message: "Error deleting note with id " + req.params.noteId
            });        
        })
};