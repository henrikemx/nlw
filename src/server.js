const express = require('express')
const server = express()

// configurar pasta pública
server.use(express.static("public"))
// configurar caminhos da conexão

// utilizando template engine
const nunjuncks = require('nunjucks')
nunjuncks.configure('src/views', {
    express: server,
    noCache: true
})

// configurar página principal
// req = Requisição
// res = Resposta
server.get('/', (req, res)=> {
    return res.render("index.html", { title: 'Seu marketplace de coleta de resíduos'})
})

server.get('/create-point', (req, res)=> {
    return res.render("create-point.html")
})

server.get('/search', (req, res)=> {
    return res.render("search-results.html")
})
// ligando o servidor
// server.listen(3000)
server.listen(3001)