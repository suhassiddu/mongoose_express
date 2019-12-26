function routes(app) {
    const { create, findAll, findOne, update, remove } = require('./controllers')
    app.post('/notes', create)
    app.get('/notes', findAll)
    app.get('/notes/:noteId', findOne)
    app.put('/notes/:noteId', update)
    app.delete('/notes/:noteId', remove)
}

module.exports = routes