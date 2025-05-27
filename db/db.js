const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':todo:')

db.serialize(() => {
  db.run(`CREATE TABLE todo_list  IF NOT EXISTS(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          titulo VARCHAR(100) NOT NULL,
          descripcion 
          )`)
})