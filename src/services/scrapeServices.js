const axios = require("axios"); 
const cheerio = require("cheerio"); 

const BASE_URL = "https://www.aytoleon.es/es/actualidad";

const scrapePage = async (url, processFunc) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    return processFunc($);
  } catch (error) {
    if (error.code === 'ECONNRESET') {
      console.error(`Error de conexión al realizar scraping en la página ${url}: ${error.message}`);
    } else {
      console.error(`Error al realizar scraping en la página ${url}: ${error.message}`);
    }
    return [];
  }
};

const processAvisos = ($) => {
  const avisos = [];
  $(".panel-content").each((_, element) => {
    $(element)
      .find(".row.listitem-row")
      .each((__, avisoElement) => {
        const title = $(avisoElement).find(".listitem-title").text().trim() || null;
        const subtitle = $(avisoElement).find(".listitem-subtitle").text().trim() || null;
        const relativeLink = $(avisoElement).closest("a").attr("href") || null;
        const link = relativeLink ? new URL(relativeLink, BASE_URL).href : null;

        avisos.push({ title, subtitle, link });
      });
  });
  return avisos;
};

const scrapeAvisoContent = async (url) => {
  try {
    console.info(`Scraping contenido de: ${url}`);
    const { data } = await axios.get(url); 
    const $ = cheerio.load(data); 

    const content = $('div[class^="ExternalClass"]').text().trim() || null;
    return { content };
  } catch (error) {
    console.error(`Error al extraer contenido del aviso en ${url}: ${error.message}`);
    return { content: null };
  }
};

const scrapeAvisos = () =>
  scrapePage(`${BASE_URL}/avisos/Paginas/default.aspx`, processAvisos);

module.exports = { scrapeAvisos, scrapeAvisoContent };
