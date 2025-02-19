const express = require('express');
const router = express.Router();
const eventsController = require('../../controllers/eventsController');

router.get('/scrape', eventsController.scrapeAgenda);
router.get('/events', eventsController.getEvents);
router.get('/events/:id', eventsController.getEvent);
router.put('/events/:id', eventsController.updateEventController);
router.delete('/events/:id', eventsController.deleteEventController);

module.exports = router;