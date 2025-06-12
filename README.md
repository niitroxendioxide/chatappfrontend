# Aplicación Chat Frontend

Proyecto planteado como aplicación web que permite la comunicación a tiempo real en base al protocolo de red WebSockets.
Este es el Front-end, o sea, la aplicación que ejecuta cada usuario, encargada de enviar mensajes y mostrarlos en pantalla.
Está desarrollada utilizando React + Vite + TypeScript, es una implementación breve en modulos y por ahora contiene solo
archivos necesarios para la demostración del protocolo de red WebSockets

Presentación: https://docs.google.com/presentation/d/1gxCQblTd0YT3NhLiqpPpbJL8Y5p-2VA6roaKXZGnJxk/edit


### Como Ejecutar

Este programa requiere Node.JS para correr, en caso de no tenerlo instalar, recomendable utilizar la última version accesible,
una vez Node.JS instalado, correr los siguientes comandos en la consola dentro de la carpeta root del proyecto.

Es necesario tener en cuenta que la aplicación requiere de el repositorio back-end para poder mostrar mensajes en pantalla, una vez 
clonado el repositorio backend y esté ejecutandose seguír los siguientes pasos:

1. Ejecutar el comando `npm install`

2. Editar la IP del archivo "static/net.ts" a la IP privada del dispositivo ejecutando la aplicación backend

3. Ejecutar el comando `npm run dev`

## Documentación

### Componentes

Hay trés modulos de componentes de la pantalla principal al momento de ser escrita esta documentación, estos son:
- `messagetextbox.tsx`
- `textchat.tsx`
- `userlist.tsx`

El `messagetextbox.tsx` incluye la caja de texto **\<input>** para escribir el mensaje y su **\<button>** respectivo para enviarlo, además de tener
el código respectivo para conectarlo. 

El componente `textchat.tsx`, por otro lado, es quien se encarga de mostrar todos los mensajes. 

Por último, el component `userlist.tsx` se encarga de mostrar cada usuario conectado al servidor en el momento actual, agregando o 
removiendo a cada usuario de la lista.

### Modulos Auxiliares

En la carpeta `/utils/` se encuentran modulos de utilidad que apoyan al código para mantenerlo mas fácil de leer. por ejemplo:
`connections.ts` define la clase `WebSocketManager` que crea una conexión unica con el servidor para ser manejada por los distintos archivos del
programa. El archivo `time.ts` brinda utilidades para mostrar el tiempo en pantalla y el archivo `types.ts` contiene las distintas estructuras 
de datos o interfaces parar el programa

### Hooks

Los hooks son funciones que permiten que un sistema base se conecte a una extensión del código, son usadas en los distintos componentes son utilizados para 
acceder a las conexiones de cierto tipo, hay dos hooks uno destinado a ser usado en el lado del Login, y ejecutara código en el momento que el usuario 
se loguee (`hooks/useWebSocketUser.ts`) y otro destinado a usos generales de comunicación WebSocket (`hooks/webSocketListener.ts`)