const sqlite3 = require('sqlite3').verbose()

// iniciar o objeto que irá fazer operações no db
const db = new sqlite3.Database('./src/database/database.db')

// aqui o objeto db será exportado como um módulo
module.exports = db

// utilizar o objeto de bd para nossas operações
// db.serialize(() => {

// criando uma tabela com comandos SQL
// db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         image TEXT,
//         name TEXT,
//         address TEXT,
//         address2 TEXT,
//         state TEXT,
//         city TEXT,
//         items TEXT
//     );
// `)

// Inserir dados na tabela
// const query = `
// INSERT INTO places (
//     image, 
//     name, 
//     address, 
//     address2, 
//     state, 
//     city,
//     items
// ) VALUES (
//     ?,?,?,?,?,?,?
// );
// `
// const values = [
//     "http://localhost:3001/assets/Papersider.jpg",
//     "Papersider",
//     'Guilherme Gimballa, Jardim América',
//     'nº 260',
//     'Santa Catarina',
//     'Rio do Sul',
//     'Papéis e Papelão'
// ]

// function afterInsertData(err) {
//     if (err) {
//         return console.log(err)
//     }
//     console.log('Cadastrado com sucesso !!')
//     console.log(this)
// }

// db.run(query, values, afterInsertData)

// Consultar dados na tabela
// db.all(`
//         SELECT * FROM places`,
//     function (err, rows) {
//         if (err) {
//             return console.log(err)
//         }
//         console.log('Lista dos registros solicitada:')
//         console.log(rows)
//     }
// )
// deletar dados na tabela
// db.run(`DELETE FROM places WHERE id = ?`, [10], function (err) {
//     if (err) {
//         return console.log('Registro apagado com sucesso.')
//     }
// })

//     // consultando bd após deleção
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
// })