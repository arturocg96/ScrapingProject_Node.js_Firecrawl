const express = require('express');
const avisosController = require('../../controllers/avisosController');

const router = express.Router();

router.get('/scrape', avisosController.scrapeAvisosAndSave);
router.get('/', avisosController.getAllAvisos);
router.put('/:id', avisosController.updateAviso);
router.delete('/:id', avisosController.deleteAviso);

module.exports = router;
