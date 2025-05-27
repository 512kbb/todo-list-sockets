# Prueba Postulación

Este proyecto es una prueba técnica para el proceso de postulación 
## Requisitos

- Node.js (versión recomendada: 22+)
(si tienes nvm :
```bash
nvm install 22.14.0
```

```bash
nvm use 22.14.0
```
) es la version que utilice en el desarrollo
- npm o yarn

## Instalación

clonar el repositorio
```bash
git clone git@github.com:512kbb/todo-list-sockets.git
```

ingresar a la carpeta
```bash
cd todo-list-sockets
```

instalar las dependencias
```bash
npm install
```

## endpoints
usar insomnia o postman, o apliacion equivalente de preferencia
### GET - Obtiene las tareas
```
localhost:3000/tasks
```

### POST - Crea una tarea

```
localhost:3000/tasks
```
recibe un json en esta estructura
```
{
	"titulo": "titulo",
	"descripcion": "descripcion"
}
```

### PUT - Actualiza el estado de una tarea

```
localhost:3000/tasks/:id
```
recibe un json en esta estructura
```
{
    "status": "completada" o "pendiente"
}
```
cualquier otro estado arrojara un status 400

### DELETE - Eliminar una tarea
```
localhost:3000/tasks/:id
```
## Uso

para iniciar el proyecto
```bash
npm start
```

en el navegador abrir la instancia de [Cliente](http://localhost:3000/)

## Autor

- [Diego Parra]

## Licencia

Este proyecto es solo para fines de evaluación.

## Comentarios sobre el proyecto
Nunca habia trabajado integrando websockets, si habia participado en proyectos
donde se utilizaran pero no los habia desarrollado yo,
por lo cual hay decisiones que tome siguiendo la documentacion de socket.io, como por ejemplo el enviar el index.html atraves de la ruta base '/',  
y otras por la simplicidad que me dio sqlite para hacer la consulta al iniciar
la conexion del cliente  y el servidor.
Mas alla de eso, el disenio de la app es bastante estandar para una desarrollada
con express.js

