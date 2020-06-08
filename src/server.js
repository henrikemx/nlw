const express = require('express')
const server = express()

// importando o bd
const db = require('./database/db')

// configurar pasta pública
server.use(express.static("public"))

// habilitar o uso do req.body na aplicação
server.use(express.urlencoded({
    extended: true
}))

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
server.get('/', (req, res) => {
    return res.render("index.html", {
        title: 'Seu marketplace de coleta de resíduos'
    })
})

server.get('/create-point', (req, res) => {

    // req.query: Query Strings da nossa url
    console.log(req.query)

    return res.render("create-point.html")
})

server.post('/savepoint', (req, res) => {

    // Inserir dados na tabela
    const query = `
    INSERT INTO places (
        image, 
        name, 
        address, 
        address2, 
        state, 
        city,
        items
    ) VALUES (
        ?,?,?,?,?,?,?
    );
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        console.log('Cadastrado com sucesso !!')
        console.log(this)
        return res.render('create-point.html', {
            saved: true
        })
    }

    db.run(query, values, afterInsertData)

    // esta função irá exibir o conteúdo do bd
    db.all(`
    SELECT * FROM places`,
        function (err, rows) {
            if (err) {
                return console.log(err)
            }
            console.log('Lista dos registros solicitada:')
            console.log(rows)
        }
    )

})

server.get('/search', (req, res) => {

    const search = req.query.search

    if (search == '') {
        //pesquisa vazia
        return res.render("search-results.html", {
            total: 0
        })
    }
    // buscar as informações no bd
    // consultando bd após deleção
    db.all(`
    SELECT * FROM places WHERE city LIKE '${search}'`,
        function (err, rows) {
            if (err) {
                return console.log(err)
            }
            console.log('Lista dos registros solicitada:')
            console.log(rows)

            const total = rows.length

            // exibe a página html com as informações do bd
            return res.render("search-results.html", {
                places: rows,
                total
            })
        }


    )

})
// ligando o servidor
// server.listen(3000)
server.listen(3001)