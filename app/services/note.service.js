const Note = require('../models/note.model.js');
const response = null;
//create and save a new note
exports.createNote = (data) => {
    //create a note
    const note = new Note({
        title: data.title || "Untitled Note",
        content: data.content
    });

    //save note in the database
    return note.save()
        .then(data => {
            console.log("data=", data);
            return data;
        }).catch(err => {
            console.log(err.message);
        });
};

//retrieve and return all notes from the database.
exports.findAll = () => {
    return Note.find()
        .then(notes => {
            return notes;
        }).catch(err => {
            console.log(err.message);
        });
};

//find a single note with a noteId
exports.findOne = (noteId) => {
    return Note.findById(noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + noteId
                });
            }
            return note;
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return "Note not found with id " + noteId
            }
            return "Error retrieving note with id " + noteId
        });
};

//update a note identified by the noteId in the request
exports.update = (noteId, data) => {

    //find note by id and update it with the request body
    return Note.findByIdAndUpdate(noteId, {
        title: data.title || "Untitled Note",
        content: data.content
    }, { new: true })
        .then(note => {
            if (!note) {
                return "Note not found with id " + noteId
            }
            return note;
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return "Note not found with id " + noteId
            }
            return "Error updating note with id " + noteId
        });
};

//delete a note with the specified noteId in the request
exports.delete = (noteId) => {
    return Note.findByIdAndRemove(noteId)
        .then(note => {
            if (!note) {
                return "Note not found with id " + noteId
            }
            return { message: "Note deleted successfully!" };
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NoteFound') {
                return "Note not found with id " + noteId
            }
            return "Could not delete note with id " + noteId
        });
};