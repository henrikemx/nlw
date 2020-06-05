const express = require('express')
const server = express()

// configurar pasta pública
server.use(express.static("public"))
// configurar caminhos da conexão

// configurar página principal
// req = Requisição
// res = Resposta
server.get('/', (req, res)=> {
    res.sendFile(__dirname + "/views/index.html")
})

server.get('/create-point', (req, res)=> {
    res.sendFile(__dirname + "/views/create-point.html")
})
// ligando o servidor
// server.listen(3000)
server.listen(3001)