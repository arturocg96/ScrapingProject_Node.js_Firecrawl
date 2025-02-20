const { default: FireCrawlApp } = require('@mendable/firecrawl-js');
const { z } = require('zod');
const { insertEvents, getAllEvents, getEventById, deleteEvent, updateEvent } = require('../models/eventsModel');
const { validateEvent } = require('../utils/validators/eventsValidators');

const app = new FireCrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY
});

const schema = z.object({
  events: z.array(z.object({
    title: z.string(),
    date: z.string(),
    hour: z.string().optional(),
    location: z.string().optional()
  }))
});

const scrapeAgenda = async (req, res) => {
  try {
    const extractResult = await app.extract([
      "https://aytoleon.es/es/actualidad/agenda/Paginas/default.aspx"
    ], {
      prompt: "Extract the Title, Date, Hour, and Location from the events. Ensure that each event has a Title and Date.",
      schema,
    });

    const events = extractResult.data.events;
    const resultado = await insertEvents(events);

    res.json({
      success: true,
      resumen: {
        totalEventosEncontrados: resultado.resumen.total,
        eventosNuevos: resultado.resumen.nuevos,
        eventosDuplicados: resultado.resumen.duplicados,
        mensaje: `Se encontraron ${resultado.resumen.total} eventos. Se insertaron ${resultado.resumen.nuevos} nuevos eventos y se encontraron ${resultado.resumen.duplicados} duplicados.`
      },
      nuevosEventos: resultado.nuevosEventos || [],
      eventosDuplicados: resultado.eventosduplicados || []
    });

  } catch (error) {
    console.error('Error en el proceso:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getEvents = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  
  const result = await getAllEvents(page, limit);
  
  if (result.success) {
      res.json(result);
  } else {
      res.status(500).json(result);
  }
};

const getEvent = async (req, res) => {
  const { id } = req.params;
  const result = await getEventById(id);
  
  if (result.success) {
      if (!result.event) {
          res.status(404).json({ success: false, error: 'Evento no encontrado' });
      } else {
          res.json(result);
      }
  } else {
      res.status(500).json(result);
  }
};

const updateEventController = async (req, res) => {
  const { id } = req.params;
  const eventData = req.body;
  
  const result = await updateEvent(id, eventData);
  
  if (result.success) {
      res.json(result);
  } else {
      res.status(result.error === 'Evento no encontrado' ? 404 : 500).json(result);
  }
};

const deleteEventController = async (req, res) => {
  const { id } = req.params;
  
  const result = await deleteEvent(id);
  
  if (result.success) {
      res.json(result);
  } else {
      res.status(result.error === 'Evento no encontrado' ? 404 : 500).json(result);
  }
};

const insertEvent = async (req, res) => {
  try {
      const eventData = req.body;
      

      const validationResult = validateEvent(eventData);
      
      if (!validationResult.isValid) {
          return res.status(400).json({
              success: false,
              error: 'Datos del evento inválidos',
              errores: validationResult.errors
          });
      }


      const resultado = await insertEvents([eventData]);
      
      res.json({
          success: true,
          resumen: {
              totalEventos: resultado.resumen.total,
              eventosNuevos: resultado.resumen.nuevos,
              eventosDuplicados: resultado.resumen.duplicados,
              mensaje: `Se procesó 1 evento. Se ${resultado.resumen.nuevos === 1 ? 'insertó' : 'encontró duplicado'} el evento.`
          },
          nuevoEvento: resultado.nuevosEventos[0] || null,
          eventoDuplicado: resultado.eventosduplicados[0] || null
      });
  } catch (error) {
      console.error('Error al insertar evento:', error);
      res.status(500).json({
          success: false,
          error: error.message
      });
  }
};
module.exports = {
  scrapeAgenda,
  getEvents,
  getEvent,
  updateEventController,
  deleteEventController, 
  insertEvent
};