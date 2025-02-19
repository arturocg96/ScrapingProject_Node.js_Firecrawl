const { connect } = require('../config/dbSQL');
const queries = require('./queries/avisosQueries');

const saveAvisos = async (avisos) => {
  const connection = await connect();
  
  const results = [];
  for (const aviso of avisos) {
    const { title, subtitle, link, content, category } = aviso;
    
    try {
      await connection.execute(queries.insertAviso, [
        title,
        subtitle || null,
        link || null,
        content || null,
        category || "Sin categoría",
      ]);
      results.push({ status: "success", aviso });
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        results.push({ status: "duplicate", aviso });
      } else {
        results.push({ status: "error", aviso, message: error.message });
      }
    }
  }
  
  const saved = results.filter((result) => result.status === "success");
  const duplicates = results.filter((result) => result.status === "duplicate");
  const errors = results.filter((result) => result.status === "error");
  
  console.log(`\n==== RESUMEN SCRAPING AVISOS  - WEB AYTO ==== Scraping completado con éxito.  Resultados: - Total de avisos procesados: ${avisos.length} - Nuevos avisos almacenados: ${saved.length} - Avisos duplicados: ${duplicates.length} - Errores durante el proceso: ${errors.length}  ${
    errors.length > 0
      ? `Errores detectados:\n${errors
          .map((err) => `  - Título: ${err.aviso.title} | Motivo: ${err.message}`)
          .join("\n")}`
      : "No se detectaron errores durante el proceso."
  } ============================\n`);
  
  await connection.end();
  return { results, summary: { saved, duplicates, errors } };
};

const getAllAvisos = async () => {
  const connection = await connect();
  
  try {
    const [rows] = await connection.execute(queries.selectAllAvisos);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
};

const getAvisoById = async (id) => {
  const connection = await connect();
  
  try {
    const [rows] = await connection.execute(queries.selectAvisoById, [id]);
    return rows[0]; 
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
};

const updateAviso = async (id, updatedAviso) => {
  const connection = await connect();
  
  const { title, subtitle, link, content, category } = updatedAviso;
  
  try {
    const [result] = await connection.execute(queries.updateAviso, [
      title,
      subtitle || null,
      link || null, 
      content || null,
      category || "Sin categoría",
      id
    ]);
    return { status: "success", updatedCount: result.affectedRows };
  } catch (error) {
    return { status: "error", message: error.message };
  } finally {
    await connection.end();
  }
};

const deleteAviso = async (id) => {
  const connection = await connect();
  
  try {
    const [result] = await connection.execute(queries.deleteAviso, [id]);
    if (result.affectedRows === 0) {
      return { status: "not_found", message: "Aviso no encontrado." };  
    }
    return { status: "success", deletedCount: result.affectedRows };
  } catch (error) {
    return { status: "error", message: error.message };
  } finally {
    await connection.end();
  }
};

module.exports = {
  saveAvisos,
  getAllAvisos,
  getAvisoById,
  updateAviso,
  deleteAviso
};