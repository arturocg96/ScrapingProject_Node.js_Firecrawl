const express = require('express');
const router = express.Router();
const eventsRoutes = require('./api/apiEventsRoutes');
const avisosRoutes = require('./api/apiAvisosRoutes');

router.use('/events', eventsRoutes);
router.use('/avisos', avisosRoutes);


module.exports = router;