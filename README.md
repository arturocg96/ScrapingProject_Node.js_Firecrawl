# Node.js Web Scraper API

Este proyecto es una API desarrollada en Node.js que realiza scraping de eventos y avisos de diferentes webs municipales. Para una entidad usa tecnologías como Express, Axios, Cheerio y MySQL para extraer, almacenar y exponer los datos. Para la otra se integra con Firecrawl, que provee los datos ya estructurados. Ambas fuentes se unifican y sirven consistentemente a través de endpoints RESTful. El proyecto ejemplifica dos enfoques: scraping casero y uso de un servicio externo especializado.

## Características

- **Scraping de datos:** Extrae avisos y eventos de las páginas web del Ayuntamiento de León.
- **Almacenamiento en base de datos:** Guarda los datos scrapeados en una base de datos MySQL, evitando duplicados.
- **Endpoints RESTful:** Exposición de datos mediante rutas organizadas.
- **Validación de datos:** Controla que los datos estén completos antes de almacenarlos.
- **Modularidad:** Código dividido en controladores, servicios, modelos y rutas para facilitar su mantenimiento y escalabilidad.

## Requisitos

- Node.js (v14 o superior)
- MySQL (v8.0 o superior)
- Variables de entorno configuradas en un archivo `.env`:
````
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=your_port
PORT=your_app_port
FIRECRAWL_API_KEY=your_api_key
````
## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

#### 1. Clona el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```
### 2. Instala dependencias
Asegúrate de tener Node.js y npm instalados. Luego ejecuta:
```bash
npm install
```

#### 3. Configura la base de datos
Ejecuta  el script SQL adjunto junto  al proyecto en la carpeta db. 

### 4. Inicia el servidor. 
Ejecuta el siguiente comando para iniciar la aplicación:
```bash
npm run dev
```

#### 5. Realización de pruebas
Las pruebas de los endpoints están disponibles en el archivo .rest incluido en el proyecto. Puedes usar herramientas como REST Client en Visual Studio Code para ejecutarlas.

# Uso de la API

## Endpoints Disponibles

### Avisos

- **Scrape avisos:** `GET /api/avisos/scrape`
- **Obtener todos los avisos:** `GET /api/avisos/`
- **Actualizar un aviso:** `PUT /api/avisos/:id`
- **Eliminar un aviso:** `DELETE /api/avisos/:id`

### Eventos

- **Scrape eventos:** `GET /api/events/scrape`
- **Obtener todos los eventos:** `GET /api/events/events`
- **Obtener un evento específico:** `GET /api/events/events/:id`
- **Actualizar un evento:** `PUT /api/events/events/:id`
- **Eliminar un evento:** `DELETE /api/events/events/:id`
