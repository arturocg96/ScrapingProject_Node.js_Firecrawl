const avisosModel = require('../models/avisosModel');
const scrapeService = require('../services/scrapeServices');
const { categorizeAviso } = require('../utils/categorizeUtils');

const scrapeAvisosAndSave = async (req, res) => {
    try {
        console.log("Iniciando scraping de avisos...");
        const avisos = await scrapeService.scrapeAvisos();
        console.log(`Scraping completado. ${avisos.length} avisos encontrados.`);

        for (const aviso of avisos) {
            console.log(`Procesando aviso: ${aviso.title}`);
            if (aviso.link) {
                const { content } = await scrapeService.scrapeAvisoContent(aviso.link);
                aviso.content = content;
                console.log(`Contenido extraído para el aviso: ${aviso.title}`);
            } else {
                aviso.content = null;
                console.log(`No se encontró contenido para el aviso: ${aviso.title}`);
            }

            aviso.category = categorizeAviso(aviso);
            console.log(`Categoría asignada al aviso: ${aviso.title} - ${aviso.category}`);
        }

        // Guardar avisos usando el método del modelo CRUD
        const { results, summary } = await avisosModel.saveAvisos(avisos);

        console.log(`Resultados del guardado:`);
        console.log(`Avisos procesados: ${avisos.length}`);
        console.log(`Avisos guardados: ${summary.saved.length}`);
        console.log(`Avisos duplicados: ${summary.duplicates.length}`);
        console.log(`Errores durante el guardado: ${summary.errors.length}`);

        res.json({
            message: 'Scraping y almacenamiento de avisos completados',
            total_processed: avisos.length,
            saved: summary.saved.length,
            duplicates: summary.duplicates.length,
            errors: summary.errors,
        });
    } catch (error) {
        console.error('Error durante el proceso de scraping o almacenamiento:', error.message);
        res.status(500).json({ error: 'Error al realizar scraping o guardar los avisos' });
    }
};

const getAllAvisos = async (req, res) => {
    try {
        const avisos = await avisosModel.getAllAvisos();
        res.json(avisos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los avisos' });
    }
};

// **UPDATE**: Actualizar un aviso
const updateAviso = async (req, res) => {
    const { id } = req.params;
    const updatedAviso = req.body;

    try {
        const result = await avisosModel.updateAviso(id, updatedAviso);
        if (result.status === "success") {
            res.json({ message: `Aviso con id ${id} actualizado correctamente` });
        } else {
            res.status(400).json({ error: result.message });
        }
    } catch (error) {
        console.error('Error durante la actualización del aviso:', error.message);
        res.status(500).json({ error: 'Error al actualizar el aviso' });
    }
};

// **DELETE**: Eliminar un aviso
const deleteAviso = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await avisosModel.deleteAviso(id);
        if (result.status === "success") {
            res.json({ message: `Aviso con id ${id} eliminado correctamente` });
        } else {
            res.status(404).json({ error: result.message });
        }
    } catch (error) {
        console.error('Error durante la eliminación del aviso:', error.message);
        res.status(500).json({ error: 'Error al eliminar el aviso' });
    }
};

module.exports = { scrapeAvisosAndSave, getAllAvisos, updateAviso, deleteAviso };
