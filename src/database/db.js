const sqlite3 = require('sqlite3').verbose()

// iniciar o objeto que irá fazer operações no db
const db = new sqlite3.Database('./src/database/database.db')

// utilizar o objeto de bd para nossas operações
db.serialize(() => {
    // criando uma tabela com comandos SQL
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
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
    db.run(query, [
        "",
    ])

    // Consultar dados na tabela

    //deletar dados na tabela
})