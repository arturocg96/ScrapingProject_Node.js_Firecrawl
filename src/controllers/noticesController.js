const { default: FireCrawlApp } = require('@mendable/firecrawl-js');
const { z } = require('zod');
const avisosModel = require('../models/avisosModel');
const { categorizeAviso } = require('../utils/categorizeUtils');
const { validateAviso } = require('../utils/validators/avisosValidators');

const app = new FireCrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY
});

const schema = z.object({
  notices: z.array(z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    link: z.string()
  }))
});

const contentSchema = z.object({
  content: z.string()
});

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const scrapeNoticesAndSave = async (req, res) => {
  try {
    console.log("Iniciando scraping de notices...");

    const extractResult = await app.extract([
      "https://www.aytoleon.es/es/actualidad/avisos/Paginas/default.aspx"
    ], {
      prompt: "Extract all notices from the page. For each notice, get the title, subtitle (if available), and the link.",
      schema,
    });

    const notices = extractResult.data.notices;
    console.log(`Scraping completado. ${notices.length} notices encontrados.`);

    for (const notice of notices) {
      console.log(`Procesando notice: ${notice.title}`);
      
      try {
        if (notice.link) {
          await delay(2000); 
          const contentResult = await app.extract([notice.link], {
            prompt: "Extract the complete main content text from this notice page.",
            schema: contentSchema,
          });
          notice.content = contentResult.data.content;
          console.log(`Contenido extraído para el notice: ${notice.title}`);
        } else {
          notice.content = null;
          console.log(`No se encontró contenido para el notice: ${notice.title}`);
        }

        notice.category = categorizeAviso(notice);
        console.log(`Categoría asignada al notice: ${notice.title} - ${notice.category}`);

      } catch (error) {
        console.error(`Error procesando notice ${notice.title}:`, error.message);
        notice.content = null;
        notice.error = error.message;
      }
    }

    const { results, summary } = await avisosModel.saveAvisos(notices);

    console.log(`Resultados del guardado:`);
    console.log(`Notices procesados: ${notices.length}`);
    console.log(`Notices guardados: ${summary.saved.length}`);
    console.log(`Notices duplicados: ${summary.duplicates.length}`);
    console.log(`Errores durante el guardado: ${summary.errors.length}`);

    res.json({
      message: 'Scraping y almacenamiento de notices completados',
      total_processed: notices.length,
      saved: summary.saved.length,
      duplicates: summary.duplicates.length,
      errors: summary.errors
    });

  } catch (error) {
    console.error('Error durante el proceso de scraping o almacenamiento:', error.message);
    res.status(500).json({ error: 'Error al realizar scraping o guardar los notices' });
  }
};

const getAllNotices = async (req, res) => {
  try {
    const notices = await avisosModel.getAllAvisos();
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los notices' });
  }
};

const updateNotice = async (req, res) => {
  const { id } = req.params;
  const updatedNotice = req.body;

  try {
    const result = await avisosModel.updateAviso(id, updatedNotice);
    if (result.status === "success") {
      res.json({ message: `Notice con id ${id} actualizado correctamente` });
    } else {
      res.status(400).json({ error: result.message });
    }
  } catch (error) {
    console.error('Error durante la actualización del notice:', error.message);
    res.status(500).json({ error: 'Error al actualizar el notice' });
  }
};

const deleteNotice = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await avisosModel.deleteAviso(id);
    if (result.status === "success") {
      res.json({ message: `Notice con id ${id} eliminado correctamente` });
    } else {
      res.status(404).json({ error: result.message });
    }
  } catch (error) {
    console.error('Error durante la eliminación del notice:', error.message);
    res.status(500).json({ error: 'Error al eliminar el notice' });
  }
};

const insertNotice = async (req, res) => {
    try {
      const newNotice = req.body;

      const validationResult = validateAviso(newNotice);
      if (!validationResult.isValid) {
        return res.status(400).json({
          error: 'Datos inválidos',
          details: validationResult.errors
        });
      }

      const noticeToInsert = {
        title: newNotice.title,
        subtitle: newNotice.subtitle || null,
        link: newNotice.link || null,
        content: newNotice.content || null,
        category: newNotice.category || "Sin categoría"
      };

      const { results, summary } = await avisosModel.saveAvisos([noticeToInsert]);
  
      if (summary.saved.length > 0) {
        res.status(201).json({
          message: 'Notice creado correctamente',
          notice: summary.saved[0].aviso
        });
      } else if (summary.duplicates.length > 0) {
        res.status(409).json({
          error: 'El notice ya existe',
          details: 'Ya existe un notice con este título'
        });
      } else {
        res.status(500).json({
          error: 'Error al crear el notice',
          details: summary.errors[0]?.message || 'Error desconocido'
        });
      }
    } catch (error) {
      console.error('Error durante la inserción del notice:', error.message);
      res.status(500).json({ error: 'Error al crear el notice' });
    }
  };

module.exports = {
  scrapeNoticesAndSave,
  getAllNotices,
  updateNotice,
  deleteNotice, 
  insertNotice
};