import sqlite3 from 'sqlite3';
import * as path from 'path';
const sql3 = sqlite3.verbose()
const dbPath = path.resolve("todo.db");
const db = new sql3.Database(dbPath, sqlite3.OPEN_READWRITE, connected);

function connected(err) {
  if (err) {
    console.error('error conectando a la db: ', err.message);
    return;
  }

  console.log('conectado a la db');

}


const sql = `CREATE TABLE IF NOT EXISTS todo_list (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          titulo VARCHAR(100) NOT NULL,
          descripcion VARCHAR(500) NOT NULL,
          status VARCHAR(20) NOT NULL DEFAULT 'pendiente',
          fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
          fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP
          )`

db.run(sql, [], (err) => {
  if (err) {
    console.error('error al crear la tabla', err.message)
    return
  };
  console.log('tabla creada correctamente');
})

export default db; 