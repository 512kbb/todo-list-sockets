# Prueba Postulación Finmarkets

Este proyecto es una prueba técnica para el proceso de postulación en Finmarkets.

## Requisitos

- Node.js (versión recomendada: 22+)
(si tienes nvm :
```bash
nvm install 22.14.0
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
cd prueba_postulacion_finmarkets
```

instalar las dependencias
```bash
npm install
```

## Uso

```bash
npm start
```

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

