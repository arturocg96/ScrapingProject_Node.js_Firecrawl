const express = require('express');
const noticesController = require('../../controllers/noticesController');

const router = express.Router();

router.get('/scrape', noticesController.scrapeNoticesAndSave);
router.get('/', noticesController.getAllNotices);
router.post('/', noticesController.insertNotice);
router.put('/:id', noticesController.updateNotice);
router.delete('/:id', noticesController.deleteNotice);

module.exports = router;