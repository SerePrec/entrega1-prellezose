# Mammoth Bike Store App

Este proyecto forma parte del trabajo final correspondiente al curso de **Programación Backend** dictado por **CoderHouse**.

Se trata del desarrollo de una tienda virtual para una bicicletería (Mammoth).

## Primer entrega proyecto final

Por un lado se encuentra el desarrollo de la api REST FULL del ecommerce y por otro unas vistas de frontend para poder probar la funcionalidad de la api.
Estas vistas son provisorias en esta entrega e irán cambiando a lo largo del curso adaptándose a la funcionalidad final.

### Ejecución

Luego de clonar o descargar el repositorio e instalar todas las dependencias con `npm install`, existen dos comandos para levantar el proyecto.
Para levantarlo en modo de desarrollo junto a nodemon, utilizar `npm run dev`. De lo contrario, para ejecutarlo en "modo producción", utilizar `npm start`

### Vistas

Hay 3 páginas html servidas desde el espacio público que proveen una manera amena de probar la api REST.
Estas vistas se encuantran en las rutas:

- **/productos.html** : sería el panel de administrador, donde está el listado de productos y puedo ver, modificar, crear, y borrar productos. Filtrando la búsqueda por distintas maneras

- **/carritos.html** : es donde simulo el funcionamiento de los carritos. No va a quedar así para el final porque el manejo como está hecho no es para un consumidor. Es más para probar ahora las funciones de la api. Se pueden crear carritos, borrarlos, recorrer distintos carritos, agregar productos con las cantidades deseadas y borrar por completo un producto del carrito o modificar su cantidad desde el mismo. También tiene todo el tema de filtrado y búsqueda de productos útil para el usuario.

- **/chat.html** : es el chat que se entregó junto al desafío 6 y utiliza **websockets**.

### Api

Consiste en las siguientes rutas:

#### Router /api/productos

- GET: **/api/productos/:id?** - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
- POST: **/api/productos/** - Para incorporar productos al listado (disponible para administradores)
- PUT: **/api/productos/:id** - Actualiza un producto por su id (disponible para administradores)
- DELETE: **/api/productos/:id** - Borra un producto por su id (disponible para administradores)

#### Router /api/carrito

- GET: **/api/carrito/** - Obtengo el listado de ids de los carritos existentes
- POST: **/api/carrito/** - Crea un carrito y devuelve su id.
- DELETE: **/api/carrito/:id** - Vacía un carrito y lo elimina por si id.
- GET: **/api/carrito/:id/productos** - Me permite listar todos los productos guardados en el carrito con determinado id
- POST: **/api/carrito/:id/productos** - Para incorporar productos al carrito por su id de carrito y el id de producto y cantidad (en el cuerpo de la petición)
- PUT: **/api/carrito/:id/productos** - Para actualizar un producto del carrito por su id de carrito y los datos a actualizar del producto (en el cuerpo de la petición)
- DELETE: **/api/carrito/:id/productos/:id_prod** - Eliminar un producto del carrito por su id de carrito y de producto

### Algunos comentarios

Respecto a la API, pongo validaciones extras como middlewares para justamente verificar que los datos que llegan estén dentro de lo esperado, y sino devuelvo algún tipo de mensaje de error. También hago validaciones dentro de la función principal para considerar distintos casos y no bloquear el servidor ante un error.

El tema de la autenticación, por ahora lo dejé como piden con una variable booleana, porque lo hago bien cuando sepa como es. Por eso no generé ningún login en el front. Para probar, solo cambio el valor de la variable en el back, cosa que después se seteará de acuerdo a lo que llegue del front.

Los productos tienen los campos que piden más un par extras que yo voy a utilizar en el final. Como por ejemplo la categoría que es muy importante.

Pusé la posibilidad de subir una imagen desde el formulario. Entonces puedo elegir entre colocar una url para el thumbnail, o tomar una imagen existente y asociar su ruta desde la carpeta en donde se sube. Si subo el archivo le da prioridad a esta ruta, por más que haya colocado una url a mano.

También el carrito tiene de base el formato que piden, pero le agregué otro campo fundamental como es la cantidad por producto. No me gusta que se vayan repitiendo si agrego más del mismo

Agregué una ruta extra de carrito que sirve para actualizar los productos. Ya que aparte de agregar y borrar productos del carrito de manera completa, también quiero poder subir o bajar la cantidad del mismo desde el carrito, es decir, modificar su cantidad a otro valor dentro del rango permitido. Aparte hay una ruta extra también que me devuelve todos los ids de los carritos existentes, que uso para generar un listado de ellos en el front.

También antes de agregar o modificar productos del carrito, valido el stock actual y solo permito la acción, si la cantidad en el carrito va a ser menor o igual al stock. Sino muestro un mensaje de error indicando el problema y notificando el stock del producto.

#### Videos demo

- [Administrando productos](https://drive.google.com/file/d/1Doq09PCSIOYAJkUAQB6Nx3eRucIqIazm/view)

- [Manejando carritos](https://drive.google.com/file/d/12nTy6DGwEsbV7JIcJZzSCrtHCKq-Ltfu/view)

- [Chat](https://drive.google.com/file/d/1N9gJxCTkbRzpF2LY81fshBhQUbH4YkD0/view)

### Deploy en Heroku (Temporal):

https://entrega1-prellezose.herokuapp.com
