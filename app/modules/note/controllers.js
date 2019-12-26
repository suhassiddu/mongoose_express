const Note = require('./model')

async function create({ body: { title, content } }, res) {
    if (!content) {
        return res.status(400).send({
            message: 'Note content can not be empty'
        })
    }
    const note = new Note({
        title: title || 'Untitled Note',
        content
    })
    try {
        const data = await note.save()
        res.send(data)
    } catch ({ message }) {
        res.status(500).send({
            message: message || 'Some error occurred while creating the Note'
        })
    }

}

async function findAll(req, res) {
    try {
        const notes = await Note.find()
        res.send(notes)
    } catch ({ message }) {
        res.status(500).send({
            message: message || 'Some error occurred while retrieving notes'
        })
    }
}

async function findOne({ params: { noteId } }, res) {
    try {
        const note = await Note.findById(noteId)
        if (!note) {
            return res.status(404).send({
                message: `Note not found with id ${noteId}`
            })
        }
        res.send(note)
    } catch ({ kind }) {
        if (kind === 'ObjectId') {
            return res.status(404).send({
                message: `Note not found with id ${noteId}`
            })
        }
        return res.status(500).send({
            message: `Error retreiving note with id ${noteId}`
        })
    }
}

async function update({ body: { title, content }, params: { noteId } }, res) {
    if (!content) {
        return res.status(400).send({
            message: 'Note content can not be empty'
        })
    }
    try {
        const note = await Note.findByIdAndUpdate(noteId, {
            title: title || 'Untitled Note',
            content
        }, { new: true })
        if (!note) {
            return res.status(404).send({
                message: `Note not found with id ${noteId}`
            })
        }
        res.send(note)
    } catch ({ kind }) {
        if (kind === 'ObjectId') {
            return res.status(404).send({
                message: `Note not found with id ${noteId}`
            })
        }
        return res.status(500).send({
            message: `Error updating note with id ${noteId}`
        })
    }
}

async function remove({ params: { noteId } }, res) {
    try {
        const note = await Note.findByIdAndRemove(noteId)
        if (!note) {
            return res.status(404).send({
                message: `Note not found with id ${noteId}`
            })
        }
        res.send({ message: 'Note deleted successfully!' })
    } catch ({ kind, name }) {
        if (kind === 'ObjectId' || name === 'NotFound') {
            return res.status(404).send({
                message: `Note not found with id ${noteId}`
            })
        }
    }
}

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove
}