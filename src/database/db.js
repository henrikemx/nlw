//importar a independência do sqlite3
const sqlite3 = require('sqlite3').verbose

// iniciar o objeto que irá fazer operações no db
const db = new sqlite3.Database('./src/database/database.db')