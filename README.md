# API Web Scraper en Node.js

Este proyecto es una API desarrollada en Node.js que sirve como ejemplo práctico de dos metodologías diferentes para realizar web scraping, utilizando como caso de estudio la extracción de datos del portal web del Ayuntamiento de León. El objetivo principal es proporcionar una plantilla de referencia que pueda ser utilizada en futuros proyectos de extracción de datos.

Para demostrar el primer enfoque, se ha implementado el scraping de la sección "Avisos" utilizando una combinación de tecnologías fundamentales: Express para la creación de endpoints REST, Axios para realizar peticiones HTTP, Cheerio para el análisis y extracción de datos HTML, y MySQL para el almacenamiento persistente de la información. Este método implica un proceso en dos fases: primero se extraen los datos básicos y enlaces de la lista de avisos, y posteriormente se realiza un segundo scraping para obtener el contenido detallado de cada aviso individual.

El segundo enfoque se demuestra en las secciones "Notices" y "Events", donde se utiliza Firecrawl API, un servicio especializado en web scraping. Es importante señalar que "Avisos" y "Notices" hacen referencia a los mismos datos, lo que permite una comparación directa entre ambas metodologías de extracción.

Todos los datos extraídos, independientemente del método utilizado, se unifican y se exponen a través de endpoints RESTful consistentes. Esta estructura permite evaluar en un escenario real las ventajas y desventajas de cada enfoque: la implementación manual desde cero frente al uso de un servicio especializado. La comparación directa de estas dos estrategias sobre el mismo conjunto de datos proporciona una valiosa referencia para la toma de decisiones en futuros proyectos de scraping.

## Características

- **Scraping de datos:** Extrae avisos y eventos de las páginas web del Ayuntamiento de León mediante técnicas automatizadas de recolección de datos.

- **Almacenamiento en base de datos:** Implementa un sistema robusto de almacenamiento en MySQL que previene la duplicación de registros y mantiene la integridad de los datos.

- **Endpoints RESTful:** Proporciona una interfaz de programación clara y organizada mediante rutas REST que facilitan el acceso y manipulación de los datos extraídos.

- **Validación de datos:** Incorpora mecanismos de validación que aseguran la completitud y consistencia de los datos antes de su almacenamiento en la base de datos.

- **Modularidad:** Estructura el código siguiendo principios de diseño modular, separando la lógica en controladores, servicios, modelos y rutas para facilitar el mantenimiento y la escalabilidad del sistema.

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

# Documentación de la API

## Endpoints Disponibles

### Avisos
- **Scraping de avisos:** `GET /api/avisos/scrape`
- **Obtener todos los avisos:** `GET /api/avisos/`
- **Crear nuevo aviso:** `POST /api/avisos`
- **Actualizar aviso:** `PUT /api/avisos/:id`
- **Eliminar aviso:** `DELETE /api/avisos/:id`

### Eventos
- **Scraping de eventos:** `GET /api/events/scrape`
- **Obtener todos los eventos:** `GET /api/events/events`
- **Obtener evento específico:** `GET /api/events/events/:id`
- **Crear nuevo evento:** `POST /api/events/events`
- **Actualizar evento:** `PUT /api/events/events/:id`
- **Eliminar evento:** `DELETE /api/events/events/:id`

### Noticias
- **Scraping de noticias:** `GET /api/notices/scrape`
- **Obtener todas las noticias:** `GET /api/notices/`
- **Crear nueva noticia:** `POST /api/notices`
- **Actualizar noticia:** `PUT /api/notices/:id`
- **Eliminar noticia:** `DELETE /api/notices/:id`
