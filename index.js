import db from './db/db.js';
import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createServer } from 'http';
import { Server } from 'socket.io';
const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.json());


// test endpoint
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

/*

 POST /tasks: Endpoint para crear una nueva tarea. Deberá recibir un JSON con { "titulo": "string",
"descripcion": "string" }. Debe guardar la tarea en la base de datos y asignarle un ID único y un estado inicial
(ej. "pendiente").

*/
app.post('/tasks', (req, res) => {
  res.set('Content-Type', 'application/json');
  const { titulo, descripcion } = req.body;

  if (!titulo || !descripcion) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  const query = `INSERT INTO todo_list (titulo, descripcion) VALUES (?, ?) RETURNING *;`;
  const params = [titulo, descripcion];

  db.get(query, params, function (err, row) {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    console.log(row)
    const task = {
      id: row.id,
      titulo: row.titulo,
      descripcion: row.descripcion,
      status: row.status,
      fecha_creacion: row.fecha_creacion,
      fecha_actualizacion: row.fecha_actualizacion
    }
    res.status(201).json(task);
    io.emit('task_created', task);
  });
})

/* 
- GET /tasks: Endpoint para obtener todas las tareas existentes 
*/
app.get('/tasks', (req, res) => {
  res.set('Content-Type', 'application/json');
  const query = 'SELECT * FROM todo_list;';
  const data = { tasks: [] }
  try {
    db.all(query, [], function (err, rows) {
      if (err) throw err;
      rows.forEach((row) => {
        data.tasks.push({
          id: row.id,
          titulo: row.titulo,
          descripcion: row.descripcion,
          status: row.status,
          fecha_creacion: row.fecha_creacion,
          fecha_actualizacion: row.fecha_actualizacion
        });
      });
      const json = JSON.stringify(data, null, 2);
      console.log(json);
      res.status(200).json(data);
    })



  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
})

/* 
PUT /tasks/:id: Endpoint para actualizar el
estado de una tarea (ej. de "pendiente" a "completada").
Deberá recibir un JSON con { "status": "nuevo_estado" }. 
*/

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};
  res.set('Content-Type', 'application/json');
  if (!status) {
    return res.status(400).json({ error: 'Falta el estado de la tarea' });
  }
  if (!['pendiente', 'completada'].includes(status)) {
    return res.status(400).json({ error: 'Estado no válido' });
  }
  const query = `UPDATE todo_list SET status = ?, fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = ? RETURNING *;`;
  const params = [status, id];
  try {
    db.get(query, params, function (err, row) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
      const task = {
        id: row.id,
        titulo: row.titulo,
        descripcion: row.descripcion,
        status: row.status,
        fecha_creacion: row.fecha_creacion,
        fecha_actualizacion: row.fecha_actualizacion
      }
      res.status(200).json(task);
      io.emit('task_updated', task);
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
})

/*
- DELETE /tasks/:id: Endpoint para eliminar una tarea.
*/

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  res.set('Content-Type', 'application/json');
  const query = `DELETE FROM todo_list WHERE id = ?;`;
  const params = [id];
  try {
    db.run(query, params, function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
      res.status(204).send();
      const task = {
        id: id
      }
      io.emit('task_deleted', task);
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
})


io.on('connection', (socket) => {
  console.log('a user connected');
  const query = 'SELECT * FROM todo_list;';
  const data = { tasks: [] }
  try {
    db.all(query, [], function (err, rows) {
      if (err) throw err;
      rows.forEach((row) => {
        data.tasks.push({
          id: row.id,
          titulo: row.titulo,
          descripcion: row.descripcion,
          status: row.status,
          fecha_creacion: row.fecha_creacion,
          fecha_actualizacion: row.fecha_actualizacion
        });
      });
      socket.emit('tasks', data.tasks);
    })
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    socket.emit('error', { message: 'Error fetching tasks' });
  }


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, (err) => {
  if (err) {
    console.error('error al iniciar el servidor:', err.message);
    return;
  }

  console.log('LISTENING ON PORT 3000');
});